import { Document, Schema } from 'mongoose';
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    email: string;
    password: string;
    roles: string[];
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    email: string;
    password: string;
    roles: string[];
}>> & import("mongoose").FlatRecord<{
    email: string;
    password: string;
    roles: string[];
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
export interface User extends Document {
    email: string;
    password: string;
    roles: string[];
}
