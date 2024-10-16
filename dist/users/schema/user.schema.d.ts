import { Schema, Document } from 'mongoose';
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    email: string;
    roles: string[];
    password?: {
        salt: string;
        hash: string;
    };
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    email: string;
    roles: string[];
    password?: {
        salt: string;
        hash: string;
    };
}>> & import("mongoose").FlatRecord<{
    email: string;
    roles: string[];
    password?: {
        salt: string;
        hash: string;
    };
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
export interface User extends Document {
    email: string;
    password: {
        salt: string;
        hash: string;
    };
    roles: string[];
}
