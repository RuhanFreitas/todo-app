import bcrypt from 'bcrypt'

class BycrptHash {
    saltRounds = 10

    async hash(password: string) {
        return await bcrypt.hash(password, this.saltRounds)
    }

    async compare(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword)
    }
}

export const bcryptHash = new BycrptHash()
