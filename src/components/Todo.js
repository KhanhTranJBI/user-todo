function Todo({data}) {
    return (
        <div className={`todo ${data.completed ? 'completed' : ''}`}>
            <input type="checkbox" checked={data.completed} />
            <span>{data.title}</span>
        </div>
    );
}

export default Todo;
