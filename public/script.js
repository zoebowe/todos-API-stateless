document.getElementById('displayTodos').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const todos = await response.json();
      document.getElementById('todoDisplay').textContent = JSON.stringify(todos, null, 2);
    } catch (error) {
      alert('Error fetching todos: ' + error.message);
    }
  });
  
// Submit a new todo
document.getElementById('submitTodo').addEventListener('click', async () => {
    const name = document.getElementById('todoName').value;  // Get name from input field
    const priority = document.getElementById('todoPriority').value || 'low';  // Default priority is 'low'
    const isFun = document.getElementById('todoIsFun').value || 'true';  // Default value for isFun is 'true'
  
    const todo = { name, priority, isFun };  // Create a new todo object
  
    // Send the new todo to the server with a POST request
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)  // Send todo data in the body as JSON
    });
  
    const result = await response.json();  // Get the response from the server
    if (response.ok) {
      alert(`Todo added: ${JSON.stringify(result)}`);  // If success, alert the user
    } else {
      alert(`Error adding todo: ${result.message}`);  // If error, alert the user
    }
  });
  
  document.getElementById('deleteTodo').addEventListener('click', async () => {
    const id = document.getElementById('todoIdToDelete').value;  // Get the ID to delete from input field
  
    // Ensure that the ID is a number and is valid
    if (!id || isNaN(id)) {
      alert('Please enter a valid ID');
      return;
    }
  
    // Send the DELETE request to the server
    const response = await fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' });
  
    const result = await response.json();  // Parse the response from the server
  
    // Show the result message from the server (success or failure)
    alert(result.message);
  });  
  