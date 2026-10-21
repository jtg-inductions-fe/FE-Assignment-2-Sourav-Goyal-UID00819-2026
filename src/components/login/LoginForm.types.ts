export type LoginFormInputs = {
    username: string;
    pat: string;
};

export type LoginFormProps = {
    onSubmit: (data: LoginFormInputs) => Promise<void>;
};
