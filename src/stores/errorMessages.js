//errorMessage.js//
export const traducirError = (error) => {
  if (error?.name === 'AuthSessionMissingError') {
    return 'La sesión ha expirado o es inválida. Por favor, inicia sesión de nuevo.'
  }

  // Revisa el mensaje de error para esa frase específica
  if (error?.message?.includes('New password should be different from the old password')) {
    return 'La nueva contraseña debe ser diferente a la antigua.'
  }

  const msg = (error.message || '').toLowerCase()

  if (msg.includes('network')) return 'Error de red, por favor verifica tu conexión.'
  if (msg.includes('password')) return 'La contraseña debe tener al menos 6 caracteres.'
  if (msg.includes('user not found')) return 'Usuario no encontrado.'
  if (msg.includes('session as retrieved from url was issued over'))
    return 'El enlace ha expirado. Por favor, solicita uno nuevo.'

  return 'Ha ocurrido un error inesperado.'
}
