import User from '../models/User.js';
import crypto from 'crypto';

const hashSuiId = (text) => {
    return crypto.createHash('sha256').update(text).digest('hex');
};

const hashAddress = (address) => {
    return crypto.createHash("sha256").update(address).digest("hex");
};


export const CreateUser = async (req, res) => {
    try {
        const { sui_id, username } = req.body;
        const hashedSuiId = hashSuiId(sui_id); // Hash the wallet address

        // Check if user already exists
        const existingUser = await User.findOne({ where: { sui_id: hashedSuiId } });

        if (existingUser) {
            return res.status(200).json({
                message: 'User already exists',
                user: existingUser
            });
        }

        // Create new user
        const newUser = await User.create({
            sui_id: hashedSuiId,
            username
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const GetUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { address } = req.query; // Get address from API params

        if (!address) {
            return res.status(400).json({ message: 'Address is required' });
        }

        const hashedAddress = hashAddress(address); // Hash the input address

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.sui_id !== hashedAddress) {
            return res.status(401).json({ message: 'Unauthorized: Address does not match' });
        }

        res.status(200).json({ 
            message: 'User authenticated successfully', 
            user 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const UpdateUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { username } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username;
        await user.save();

        res.status(200).json({ message: 'Username updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
