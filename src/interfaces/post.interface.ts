import { Document } from 'mongoose';

export interface PostInterface extends Document {
    readonly name: string;
    readonly age: number;
    readonly breed: string;
}