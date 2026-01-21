import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CountdownTimer } from '../Common/Timer';
import { Button } from '../Common/Button';
import './ClaimHoldModal.css';

export const ClaimHoldModal = ({ offer, expiresAt }) => {
    const navigate = useNavigate();

    return (
        <div className="modal-overlay">
            <div className="claim-modal">
                <div className="claim-header">
                    <h2>Deal Reserved!</h2>
                    <p className="text-sm">Complete checkout before time runs out.</p>
                </div>

                <div className="claim-timer">
                    <CountdownTimer
                        targetDate={expiresAt}
                        variant="urgent"
                        onExpire={() => window.location.reload()} // Simple refresh on expire
                    />
                </div>

                <Button fullWidth onClick={() => navigate('/checkout')}>
                    Continue to Checkout
                </Button>
            </div>
        </div>
    );
};
