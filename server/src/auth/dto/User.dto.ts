import {Payload} from "../auth.service";

export class UserDto{
    id: number;
    email: string;
    constructor(payload : Payload) {
        this.id = payload.id;
        this.email = payload.email;
    }
}
