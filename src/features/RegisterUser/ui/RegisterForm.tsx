import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../model/services/registerUser";
import { resetRegisterState } from "../model/slice/registerSlice";
import { getRegisterState } from "../model/selectors/getRegisterState";
import { RegisterFormValues } from "../model/types";

export const RegisterForm = () => {
    const dispatch = useDispatch();
    const { loading, success, error } = useSelector(getRegisterState);

    const [form, setForm] = useState<RegisterFormValues>({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser(form) as any);
    };

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => dispatch(resetRegisterState()), 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error, dispatch]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>

            {success && <p>✅ Successfully registered!</p>}
            {error && <p style={{ color: "red" }}>❌ {error}</p>}
        </form>
    );
};
