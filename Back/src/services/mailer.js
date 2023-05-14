import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
/*
-Configuracion de cuentas de google
-Activar la verificación en dos pasos
-Ir a contraseña de aplicaciones
-Seleccionar App: "Otra nomnbre personalizado"
-Poner un nombre de app: Nodemailer app
-Usar el password que me da google en la Enviroment, en la parte de "pass"
*/

// attachments: [
//     {
//         filename: 'bici.jpg',
//         path: './src/public/userImg/1680035466181-Curriculum Vitae.jpg'
//     }
// ]
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'juanisa201502@gmail.com',
        pass: process.env.PASSWORD_GOOGLE
    }
});

const sendMail = async (to, subject, html) => {
    const result = await transporter.sendMail({from: 'JTS <juanisa201502@gmail.com>',to,subject,html});
    return result;
}
export default sendMail;