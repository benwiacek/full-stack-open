const Notification = ( { message, msgClass }) => {
    if (!message) {
        return null
    }

    return (
        <div className = {msgClass}>
            {message}
        </div>
    )
}

export default Notification