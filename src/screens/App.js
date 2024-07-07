import { useState, useEffect } from 'react'
import { 
  getPasswordsByUserID, 
  createPassword, 
  deletePassword, 
  updatePassword 
} from "../models";
import 'bootstrap/dist/css/bootstrap.min.css';
import Passwords from '../components/Passwords';
import NavbarComponent from '../components/Navbar';
import { useHistory } from 'react-router';
import { Flash } from '../components/Flash/flash';
import { saveAs } from 'file-saver';

const AppDashboard = () => {
  const history = useHistory()
  if (!localStorage.getItem('email')) {
    setTimeout(() => {
      window.flash('You need to be logged in', 'warning')
    }, 100)
    history.push('/login')
  }

  const [passwords, setPasswords] = useState([])
  const [isPending, setIsPending] = useState(false)

  const handleCreate = async password => {
    // save to dB
    password.userId = localStorage.getItem('email')
    const newPassword = await createPassword(
      password.accountName,
      password.accountUrl,
      password.email,
      password.password,
      password.userId
    )
    setPasswords([newPassword, ...passwords])
    window.flash('New contact created successfully', 'success')
  }

  useEffect(() => {
    setIsPending(true)
    const getContacts = async () => {
      let passwordData = await getPasswordsByUserID(localStorage.getItem('email'))
      setPasswords(passwordData)
    }
    getContacts()
    setIsPending(false)
  }, [])

  const exportToCSV = () => {
    const email = localStorage.getItem('email')
    const filename = `${email}.csv`
    const headers = "Account Name,Account URL,Email,Password\n"
    const csvData = passwords.map(password => 
      `${password.accountName},${password.accountUrl},${password.email},${password.password}`
    ).join("\n")
    const csvContent = headers + csvData
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, filename)
  }

  return (
    <>
      <NavbarComponent passwords={passwords} handleCreate={handleCreate} />
      <Flash />
      <Passwords isPending={isPending} passwords={passwords}
        handleEdit={async payload => {
          await updatePassword({
            accountName: payload.accountName,
            accountUrl: payload.accountUrl,
            email: payload.email,
            password: payload.password,
            user: localStorage.getItem('email')
          }, payload.id);
          setPasswords(passwords.map(password => password.id === payload.id ? payload : password))
        }}
        handleDelete={async id => {
          await deletePassword([id, localStorage.getItem('email')]);
          setPasswords(passwords.filter(ele => ele.id !== id))
        }}
      />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-auto">
            <button onClick={exportToCSV} className="btn btn-primary">Export to CSV</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppDashboard;