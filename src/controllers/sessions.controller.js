import { userManager } from "../managers/users.manager.js";
import { hashData } from "../utils.js";

const login = async(req,res) =>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).send("Please enter all fields");
    }
    try {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            req.session.user = {
                name: "Coder House",
                email: "adminCoder@coder.com",
                rol: "admin",
            }
            return res.send({ status: "success", message: "Logeo exitoso" });
        } else {
            // Autenticacion de usuarios normales utilizando userManager
            const authResult = await userManager.authenticateUser(email, password);
            if (authResult.success) {
                const { user } = authResult;
                // Creo un objeto de sesion con los datos del usuario
                const sessionUser = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    rol: user.rol,
                };
                // se establece la sesion del usuario
                req.session.user = sessionUser;
                return res.status(200).json({ status: 'success', message: 'Successful login' });
            } else {
                return res.status(400).json({ status: 'error', error: "Incorrect credentials" });
            }
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

const register = async(req,res) =>{
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).send({ message: "All fields are required" })
    }
    try {
        const exist = await userManager.findUserByEmail(email);
        if (exist) {
            return res.status(400).send({ status: "error", error: "User already exists" });
        }
        const hashPassword = await hashData(password);
        const newUser = await userManager.createUser({ ...req.body, password: hashPassword });
        return res.status(200).send({
            status: "succes",
            message: "User registered",
            user: newUser
        })
    } catch (error) {
        res.status(500).json({ error })
    }
}

const logout = async(req,res) =>{
    req.session.destroy(err => {
        if (err) return res.status(500).send({
            status: "error", error: "Error al  cerrar sesion"
        })
        res.redirect('/login');
    })
}

export default{
    login,register,logout
}