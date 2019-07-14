exports.validateLoginAndPassword = (email, password) => {
    const emailRegex = /\S+@\S+.\S+/
    const passwordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/

    if (!email.match(emailRegex)) {
        return { status: 400, message: 'O e-mail informa está inválido' }
    }
    if (!password.match(passwordRegex)) {
        return { status: 400, message: 'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.' }
    }
    return null
}
