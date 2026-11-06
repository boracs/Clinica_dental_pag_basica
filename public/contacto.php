<?php
/**
 * Formulario de contacto — Clínica Dental Javier Giménez Turrillas
 *
 * Recibe un POST en JSON desde el formulario web y envía el mensaje
 * por correo usando la función mail() del hosting (cPanel/Banahosting).
 * No depende de Node.js: funciona en cualquier hosting compartido con PHP.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// ---------------- CONFIGURACIÓN (edita solo estas dos líneas) ----------------
$to   = 'consulta@javiergimenezturrillas.com'; // buzón que recibe los mensajes
$from = 'noreply@' . ($_SERVER['SERVER_NAME'] ?? 'localhost'); // remitente (tu dominio)
// -----------------------------------------------------------------------------

// Solo aceptar POST
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
    exit;
}

// Leer el JSON del cuerpo de la petición
$raw = file_get_contents('php://input');
$data = json_decode($raw !== false ? $raw : '', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'JSON no válido']);
    exit;
}

// Limpiar los campos
$nombre     = trim((string) ($data['nombre'] ?? ''));
$email      = trim((string) ($data['email'] ?? ''));
$telefono   = trim((string) ($data['telefono'] ?? ''));
$mensaje    = trim((string) ($data['mensaje'] ?? ''));
$privacidad = !empty($data['privacidad']);

// Validación en servidor (misma idea que la del navegador)
$errores = [];

if ($nombre === '') {
    $errores['nombre'] = 'Indica tu nombre';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores['email'] = 'Indica un email válido';
}
if (strlen(preg_replace('/\D/', '', $telefono)) < 9) {
    $errores['telefono'] = 'Indica un teléfono de contacto';
}
if ($mensaje === '') {
    $errores['mensaje'] = 'Escribe un mensaje';
}
if (!$privacidad) {
    $errores['privacidad'] = 'Acepta la política de privacidad';
}

if ($errores !== []) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Revisa los campos', 'fields' => $errores]);
    exit;
}

// Anti inyección de cabeceras (evita saltos de línea en los campos)
foreach ([$nombre, $email, $telefono, $mensaje] as $campo) {
    if (preg_match('/[\r\n]/', $campo)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Datos no válidos']);
        exit;
    }
}

// Límites de longitud razonables (anti abuso)
if (strlen($nombre) > 100 || strlen($email) > 200 || strlen($telefono) > 30 || strlen($mensaje) > 5000) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'La solicitud es demasiado grande']);
    exit;
}

// Cuerpo del correo
$asunto = 'Contacto web: ' . $nombre;
$cuerpo = "Nuevo mensaje desde el formulario web\n\n"
    . "Nombre: {$nombre}\n"
    . "Email: {$email}\n"
    . "Teléfono: {$telefono}\n\n"
    . "Mensaje:\n{$mensaje}\n";

$cabeceras = implode("\r\n", [
    'From: ' . $from,
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
]);

// Enviar. El parámetro -f fija el remitente del sobre y mejora la entrega.
$enviado = @mail($to, $asunto, $cuerpo, $cabeceras, '-f ' . $from);

if (!$enviado) {
    http_response_code(502);
    echo json_encode([
        'ok' => false,
        'error' => 'No se ha podido enviar el mensaje. Inténtalo de nuevo más tarde.',
    ]);
    exit;
}

echo json_encode([
    'ok' => true,
    'message' => 'Mensaje enviado. Te responderemos lo antes posible.',
]);
