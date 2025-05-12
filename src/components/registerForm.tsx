import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import type { AnyFieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        <>
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <em>{field.state.meta.errors.join(', ')}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}

export function RegisterForm() {
    const [checked, setChecked] = useState(false);

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
            passwordBis: '',
            email: '',
            conditions: false,
        },
        onSubmit: async ({ value }) => {
            console.log('Inscription envoyée:', value);
        },
    });

    return (
        <div className="registerBlock flex flex-wrap" >
            <div className="w-full lg:w-1/2 flex flex-wrap justify-center content-center">
                <div className="w-3/4">
                    <h2 className='font-uncial-antiqua text-[32px] mb-[16px] text-center'>Rejoindre l'aventure</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}>
                        <div className='w-full bg-primary rounded-[3px] px-[40px] py-[16px]'>
                            {/* Pseudo */}
                            <form.Field
                                name="username"
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>Pseudo</label><br />
                                            <input
                                                type="text"
                                                className='w-full bg-background rounded-lg mt-[8px] mb-[16px] px-[16px] py-[12px] border border-1 border-secondary'
                                                id={field.name}
                                                name={field.name}
                                                placeholder='Écrivez votre pseudo'
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )
                                }}
                            />

                            {/* Mot de passe */}
                            <form.Field
                                name="password"
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>Mot de passe</label><br />
                                            <input
                                                type='password'
                                                className='w-full bg-background rounded-lg mt-[8px] mb-[16px] px-[16px] py-[12px] border border-1 border-secondary'
                                                id={field.name}
                                                name={field.name}
                                                placeholder='Écrivez votre mot de passe'
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )
                                }}
                            />

                            {/* Vérification mdp */}
                            <form.Field
                                name="passwordBis"
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>Confirmer le mot de passe</label><br />
                                            <input
                                                type='password'
                                                className='w-full bg-background rounded-lg mt-[8px] mb-[16px] px-[16px] py-[12px] border border-1 border-secondary'
                                                id={field.name}
                                                name={field.name}
                                                placeholder='Réécrivez votre mot de passe'
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )
                                }}
                            />

                            {/* E-mail */}
                            <form.Field
                                name="email"
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>Adresse mail</label><br />
                                            <input
                                                type='email'
                                                className='w-full bg-background rounded-lg my-[8px] mb-[16px] px-[16px] py-[12px] border border-1 border-secondary'
                                                id={field.name}
                                                name={field.name}
                                                placeholder='Écrivez votre adresse mail'
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            <FieldInfo field={field} />
                                        </>
                                    )
                                }}
                            />

                            {/* Checkbox conditions d'utilisations */}
                            <form.Field
                                name="conditions"
                                children={(field) => {
                                    return (
                                        <>
                                            <input
                                                type='checkbox'
                                                id={field.name}
                                                name={field.name}
                                                onChange={(e) => {
                                                    field.handleChange(e.target.checked);
                                                    setChecked(e.target.checked);
                                                }}
                                                className='hidden'
                                            />
                                            <label htmlFor={field.name} className='flex cursor-pointer'>
                                                <span className='flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text'>
                                                    {checked && <i className="fa-solid fa-check text-accent"></i>}
                                                </span>
                                                En cochant cette case, vous acceptez les conditions d'utilisation de AdA.
                                            </label>
                                            <FieldInfo field={field} />
                                        </>
                                    )
                                }}
                            />
                        </div>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <button type="submit" disabled={!canSubmit} className="btn btn-text w-full mt-[24px]">
                                    {isSubmitting ? '...' : "S'inscrire"}
                                </button>
                            )}
                        />
                    </form>
                </div>
            </div>
            <div className="registerImg hidden lg:block w-1/2">
                <div className="registerGradient h-full"></div>
            </div>
        </div>
    );
}