import React, {forwardRef} from 'react';
import Button from 'react-bootstrap/Button';

const CommonButton = forwardRef((props, ref) => {
    const {label, loading} = props
    return(
        <Button
            disabled={loading ? true : undefined}
            ref={ref}
            {...props}
        >
            {label}
        </Button>
    )
})
export default CommonButton;