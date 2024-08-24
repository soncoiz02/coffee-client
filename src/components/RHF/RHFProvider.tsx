import { ReactNode } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

type PropsType = {
    methods: UseFormReturn<any>;
    onSubmit: VoidFunction;
    children: ReactNode
}

const RHFProvider = ({ methods, onSubmit, children }: PropsType) => {
    return (
        <FormProvider {...methods}>
            <form style={{ width: '100%' }} onSubmit={onSubmit}>
                {children}
            </form>
        </FormProvider>
    )
}

export default RHFProvider