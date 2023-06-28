
export class RegistrationMessage {
    activation_token?: string;
}

export class LoginResponse {
    access?: string;
    refresh?: string;
}

export class Message {
    message?: string;
}

class User {
    id?: number;
    username?: string;
    email?: string;
    is_active?: boolean;
}

export class RegisterUser {
    username?: string;
    email?: string;
    password?: string;
    password2?: string;
}

export class UserProfile {
    id?: number;
    first_name?: string;
    last_name?: string;
    bio?: string;
    high_school?: string;
    university?: string;
    user?: User;
    nr_entities_added?: number;

    static reset(user: UserProfile) {
        user.first_name = '';
        user.last_name = '';
        user.bio = '';
        user.high_school = '';
        user.university = '';
    }
}