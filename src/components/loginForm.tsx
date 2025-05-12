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

export function LoginForm() {
    const [checked, setChecked] = useState(false);

    const form = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            console.log('Connexion réussie:', value);
        },
    });

    return (
        <div className="loginBlock flex flex-wrap" >
            <div className="loginImg hidden lg:block w-1/2">
                <div className="loginGradient h-full"></div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-wrap justify-center content-center">
                <div className="w-3/4">
                    <h2 className='font-uncial-antiqua text-[32px] mb-[16px] text-center'>Retrouver vos exploits</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}>
                        <div className='w-full bg-primary rounded-[3px] p-[40px]'>
                            {/* Pseudo */}
                            <form.Field
                                name="username"
                                children={(field) => {
                                    return (
                                        <>
                                            <label htmlFor={field.name}>Pseudo</label><br />
                                            <input
                                                type="text"
                                                className='w-full bg-background rounded-lg mt-[8px] mb-[40px] px-[16px] py-[12px] border border-1 border-secondary'
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

                            {/* Remember me */}
                            <input
                                type='checkbox'
                                id="rememberMe"
                                name="rememberMe"
                                onChange={(e) => {
                                    setChecked(e.target.checked);
                                }}
                                className='hidden'
                            />
                            <label htmlFor="rememberMe" className='flex cursor-pointer'>
                                <span className='flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text'>
                                    {checked && <i className="fa-solid fa-check text-accent"></i>}
                                </span>
                                Se souvenir de moi
                            </label>
                        </div>
                        <form.Subscribe
                            selector={(state) => [state.canSubmit, state.isSubmitting]}
                            children={([canSubmit, isSubmitting]) => (
                                <button type="submit" disabled={!canSubmit} className="btn btn-text w-full mt-[40px]">
                                    {isSubmitting ? '...' : "Se connecter"}
                                </button>
                            )}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}