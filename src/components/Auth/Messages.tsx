interface Props {
    messages: string[];
}

const Messages = ({ messages }: Props) => {
    return (
        <ul>
            {messages.map((message, idx) => (
                <li key={idx}>{message}</li>
            ))}
        </ul>
    );
};

export default Messages;
