import { useState } from 'react';

function Admin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();
    const post = await fetch('/admin/login', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"name": name, "password": password})
    })

    if(post.status !== 200){
      return setResponse('Bad')
    }
    const parseRes = await post.headers.get('Authorization');

    window.open(`/report?token=${parseRes.split('Bearer')[1]}`)
  }

  return (
    <div className="text-center">
      <h1>admin</h1>
      <form onSubmit={submitForm}>
          <div class="mx-auto col-6 col-md-4">
              <input className="form-control" type="text" placeholder="name..." name="name" value={name} onChange={(event) => setName(event.target.value)}  />
              <input className="form-control" type="text" placeholder="passsword..." name="password" value={password} onChange={(event) => setPassword(event.target.value)}  />
          </div>
        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
      {response}
    </div>
  )
};

export default Admin