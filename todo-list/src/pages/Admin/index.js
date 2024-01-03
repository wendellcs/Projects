import { useState, useEffect } from 'react'
import { db, auth } from '../../firebaseConnection'
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import './admin.css'


export default function Admin() {
    const [taskInput, setTaskInput] = useState('')
    const [user, setUser] = useState({})

    const [taskList, setTaskList] = useState([])

    useEffect(() => {
        async function loadTasks() {
            const userDetail = localStorage.getItem('@detailUser')
            setUser(JSON.parse(userDetail))

            if (userDetail) {
                const data = JSON.parse(userDetail)
                const taskRef = collection(db, 'Tarefas')

                const q = query(taskRef, orderBy("created", 'desc'), where('userUid', '==', data?.uid))

                const unSub = onSnapshot(q, (snapshot) => {
                    const tasks = []
                    snapshot.forEach(doc => {
                        tasks.push({
                            id: doc.id,
                            task: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTaskList(tasks)
                })
            }
        }


        loadTasks()
    }, [])

    async function handleRegister(e) {
        e.preventDefault()

        if (!taskInput) {
            alert('Insira uma tarefa')
            return;
        } else {
            await addDoc(collection(db, 'Tarefas'), {
                tarefa: taskInput,
                created: new Date(),
                userUid: user?.uid
            })
                .then(() => {
                    console.log('Tarefa registrada')
                    setTaskInput('')
                }).catch(err => {
                    console.log('Erro ao registrar: ' + err)
                })
        }
    }

    async function handleLogout() {
        await signOut(auth);
    }

    async function deleteTask(id) {
        const docRef = doc(db, 'Tarefas', id)
        await deleteDoc(docRef)
    }

    return (
        <div className='admin-container'>
            <div className='user-container'>
                <div className='user-infos'>
                    <h2>User: <span>{user.email}</span></h2>
                </div>
                <hr />
            </div>
            <h1>Minhas tarefas</h1>

            <form onSubmit={handleRegister} className='form'>
                <input type='text' placeholder='Digite sua tarefa...' value={taskInput} onChange={(e) => { setTaskInput(e.target.value) }} />

                <button className='btn-register' type='submit'>Adicionar tarefa</button>
            </form>

            <div className='list'>
                {taskList.map(task => {
                    return (
                        <div className='task-container' key={task.id}>
                            <p>{task.task}</p>
                            <div>
                                <button className='btn-edit'>Editar</button>
                                <button className='btn-concluir' onClick={() => deleteTask(task.id)}>Concluir</button>
                            </div>
                        </div>
                    )
                })
                }
            </div>

            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )

}