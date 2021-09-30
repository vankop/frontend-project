import React from 'react';

import { UserAnswer } from '../store/slices/chat';

const UserAnswerComponent: React.FC<UserAnswer['payload']> = ({ message }) => <div className="answer">{message}</div>;

export default UserAnswerComponent;
