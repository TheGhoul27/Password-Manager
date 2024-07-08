import { useState, useEffect } from 'react';
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
import * as XLSX from 'xlsx';
import '../styles/scrollbar.css';

const AppDashboard = () => {
  const history = useHistory();
  if (!localStorage.getItem('email')) {
    setTimeout(() => {
      window.flash('You need to be logged in', 'warning');
    }, 100);
    history.push('/login');
  }

  const [passwords, setPasswords] = useState([]);
  const [isPending, setIsPending] = useState(false);

  const handleCreate = async password => {
    // save to dB
    password.userId = localStorage.getItem('email');
    const newPassword = await createPassword(
      password.accountName,
      password.accountUrl,
      password.email,
      password.password,
      password.userId
    );
    setPasswords([newPassword, ...passwords]);
    window.flash('New contact created successfully', 'success');
  };

  useEffect(() => {
    setIsPending(true);
    const getContacts = async () => {
      let passwordData = await getPasswordsByUserID(localStorage.getItem('email'));
      setPasswords(passwordData);
    };
    getContacts();
    setIsPending(false);
  }, []);

  const exportToExcel = () => {
    const email = localStorage.getItem('email');
    const filename = `${email}.xlsx`;

    const ws = XLSX.utils.json_to_sheet(passwords);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Passwords");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, filename);
  };

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
          setPasswords(passwords.map(password => password.id === payload.id ? payload : password));
        }}
        handleDelete={async id => {
          await deletePassword([id, localStorage.getItem('email')]);
          setPasswords(passwords.filter(ele => ele.id !== id));
        }}
      />
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-auto">
            <button onClick={exportToExcel} className="btn btn-primary">Export to Excel</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppDashboard;