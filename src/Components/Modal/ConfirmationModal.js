import React, { useState } from 'react';
import Button from '../../Components/FormElements/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function ConfirmationModal({
    openModal,
    closeModal
}) {
    return (
        <Dialog
            fullWidth={true}
            open={openModal}
        >
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure want to delete?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='outlined'
                    type='button'
                    sx={{ marginRight: 1 }}
                    label='Cancel'
                    onClick={() => closeModal(false)}
                />
                <Button
                    variant='contained'
                    type='submit'
                    label='Ok'
                    onClick={() => closeModal(openModal)} autoFocus
                />
            </DialogActions>
        </Dialog>
    );
}