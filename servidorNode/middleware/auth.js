const jwt = require('jsonwebtoken');

//VERIFICAR SI LA SOLICITUD CONTIENE UN TOKEN VALIDO
function autenticateToken(req, res, next) {
    const token = req.header('Authorization'); 

    if (!token) return res.status(400).json({ error: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, 'secretkey');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Token inválido' });
    }
}

module.exports = autenticateToken;