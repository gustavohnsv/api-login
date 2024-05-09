import { createHash } from "crypto";

interface CryptProps {
    password: string;
}

class CryptService {
    async execute({ password }: CryptProps) {
        if (!password) {
            throw new Error("Informações faltando!");
        }
        const hashedPassword = createHash("md5").update(password).digest("hex").toUpperCase();
        return { hashedPassword };
    }
}

export { CryptService }