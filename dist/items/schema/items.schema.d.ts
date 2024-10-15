import { Schema } from 'mongoose';
export declare const ItemSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name?: string;
    description?: string;
    qty?: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name?: string;
    description?: string;
    qty?: number;
}>> & import("mongoose").FlatRecord<{
    name?: string;
    description?: string;
    qty?: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
