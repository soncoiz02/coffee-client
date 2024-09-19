import React, { forwardRef } from 'react'
import { IMaskInput } from 'react-imask';
type CustomProps = {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const TextMaskCustomDate = forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask="00/00/0000"
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
                placeholder="DD/MM/YYYY"
                lazy={false}
            />
        );
    },
)