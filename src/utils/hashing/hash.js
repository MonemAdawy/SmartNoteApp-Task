import bcrypt from "bcrypt";

export const hash = ({plaintText, rounds = Number(process.env.ROUNDS)}) => {
    return bcrypt.hashSync(plaintText, rounds);
}

export const compareHash = ({plaintText, hashedValue}) => {
    return bcrypt.compareSync(plaintText, hashedValue);
}