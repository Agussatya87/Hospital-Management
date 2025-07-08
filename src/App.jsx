import React, { useState } from 'react';
import logo from './assets/logo.jpg';
import { Users, Calendar, Stethoscope, FileText, UserCheck, Building, Activity, Clock, CheckCircle, XCircle, AlertCircle, Plus, Search, Filter, Edit, Eye, Menu, X, Trash2, LogOut } from 'lucide-react';

const HospitalDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');
  const [addPatientOpen, setAddPatientOpen] = useState(false);
  const [patients, setPatients] = useState([
    { id: 'P001', nama: 'Ahmad Wijaya', jenisKelamin: 'L', pekerjaan: 'Pengusaha', tempatLahir: 'Jakarta', tanggalLahir: '1980-01-01', telpon: '081234567890', alamat: 'Jl. Merdeka No. 10', tanggalDaftar: '2025-01-01' },
    { id: 'P002', nama: 'Siti Nurhaliza', jenisKelamin: 'P', pekerjaan: 'Pedagang', tempatLahir: 'Surabaya', tanggalLahir: '1985-05-15', telpon: '081234567891', alamat: 'Jl. Sudirman No. 25', tanggalDaftar: '2025-02-01' },
    { id: 'P003', nama: 'Budi Santoso', jenisKelamin: 'L', pekerjaan: 'Pengusaha', tempatLahir: 'Bandung', tanggalLahir: '1990-10-20', telpon: '081234567892', alamat: 'Jl. Thamrin No. 15', tanggalDaftar: '2025-03-01' }
  ]);
  const [newPatient, setNewPatient] = useState({
    nama: '',
    jenisKelamin: '',
    pekerjaan: '',
    tempatLahir: '',
    tanggalLahir: '',
    telpon: '',
    alamat: '',
    tanggalDaftar: ''
  });
  const [addPatientError, setAddPatientError] = useState('');
  // Edit patient modal state
  const [editPatientOpen, setEditPatientOpen] = useState(false);
  const [editPatient, setEditPatient] = useState(null);
  // Notification state
  const [notification, setNotification] = useState({ message: '', type: '' });
  // Delete patient modal state
  const [deletePatientOpen, setDeletePatientOpen] = useState(false);
  const [deletePatient, setDeletePatient] = useState(null);
  // Add state for tindakan (procedure) search
  const [procedureSearch, setProcedureSearch] = useState('');
  // Add Tindakan modal state
  const [addTindakanOpen, setAddTindakanOpen] = useState(false);
  const [newTindakan, setNewTindakan] = useState({
    idPasien: '',
    kriteria: '',
    tindakan: '',
    dokter: '',
    dokterId: '',
    keputusanKeluarga: '',
    fasilitas: '',
    status: 'terjadwal',
    tanggal: ''
  });
  const [addTindakanError, setAddTindakanError] = useState('');
  const [tindakan, setTindakan] = useState([
    { 
      id: 'T001', 
      idPasien: 'P001', 
      namaPasien: 'Ahmad Wijaya',
      kriteria: 'Operasi Jantung', 
      tindakan: 'Bypass Koroner',
      dokter: 'Dr. Hartono',
      keputusanKeluarga: 'setuju',
      fasilitas: 'Ruang Operasi A',
      status: 'terjadwal',
      tanggal: '2025-07-08'
    },
    { 
      id: 'T002', 
      idPasien: 'P002', 
      namaPasien: 'Siti Nurhaliza',
      kriteria: 'Pemeriksaan Rutin', 
      tindakan: 'CT Scan',
      dokter: 'Dr. Sari',
      keputusanKeluarga: 'pending',
      fasilitas: 'Ruang Radiologi',
      status: 'berlangsung',
      tanggal: '2025-07-07'
  
    },
    { 
      id: 'T003', 
      idPasien: 'P003', 
      namaPasien: 'Budi Santoso',
      kriteria: 'Konsultasi', 
      tindakan: 'Pemeriksaan Mata',
      dokter: 'Dr. Indra',
      keputusanKeluarga: 'tidak setuju',
      fasilitas: 'Ruang Konsultasi 1',
      status: 'selesai',
      tanggal: '2025-07-07'
    }
  ]);

  // Sample data
  const stats = {
    activePasien: 156,
    tindakanHariIni: 42,
    ruangTersedia: 8,
    dokterBertugas: 24
  };

  const rekamMedis = [
    { id: 'RM001', idPasien: 'P001', idDokter: 'D001', idTindakan: 'T001', idRuang: 'R001', diagnosis: 'Penyakit Jantung Koroner', tanggal: '2025-07-01' },
    { id: 'RM002', idPasien: 'P002', idDokter: 'D002', idTindakan: 'T002', idRuang: 'R002', diagnosis: 'Hipertensi', tanggal: '2025-07-02' },
    { id: 'RM003', idPasien: 'P003', idDokter: 'D003', idTindakan: 'T003', idRuang: 'R003', diagnosis: 'Miopia', tanggal: '2025-07-03' }
  ];

  const [dokter, setDokter] = useState([
    { id: 'D001', nama: 'Dr. Hartono', spesialisasi: 'Kardiologi', telpon: '081234567800'},
    { id: 'D002', nama: 'Dr. Sari', spesialisasi: 'Radiologi', telpon: '081234567801'},
    { id: 'D003', nama: 'Dr. Indra', spesialisasi: 'Mata', telpon: '081234567802'}
  ]);

  const [ruang, setRuang] = useState([
    { id: 'R001', namaRuang: 'Ruang Operasi A', status: 'tersedia' },
    { id: 'R002', namaRuang: 'Ruang Radiologi', status: 'terisi' },
    { id: 'R003', namaRuang: 'Ruang Konsultasi 1', status: 'maintenance' }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'setuju': return 'bg-green-100 text-green-800';
      case 'tidak setuju': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'terjadwal': return 'bg-blue-100 text-blue-800';
      case 'berlangsung': return 'bg-orange-100 text-orange-800';
      case 'selesai': return 'bg-gray-100 text-gray-800';
      case 'tersedia': return 'bg-green-100 text-green-800';
      case 'terisi': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'bertugas': return 'bg-green-100 text-green-800';
      case 'istirahat': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'setuju': return <CheckCircle className="w-4 h-4" />;
      case 'tidak setuju': return <XCircle className="w-4 h-4" />;
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  // Helper to show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pasien Aktif</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activePasien}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tindakan Hari Ini</p>
              <p className="text-2xl font-bold text-gray-900">{stats.tindakanHariIni}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ruang Tersedia</p>
              <p className="text-2xl font-bold text-gray-900">{stats.ruangTersedia}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <UserCheck className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Dokter Bertugas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.dokterBertugas}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatientModal = () => {
    if (!selectedPatient) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Detail Pasien</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Pasien</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.nama}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pekerjaan</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.pekerjaan}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.tempatLahir}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.jenisKelamin}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.tanggalLahir}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telepon</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.telpon}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal Daftar</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.tanggalDaftar}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alamat</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.alamat}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setSelectedPatient(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderActionModal = () => {
    if (!selectedAction) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Detail Tindakan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Tindakan</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAction.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pasien</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAction.namaPasien}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kriteria</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAction.kriteria}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tindakan</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAction.tindakan}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dokter</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAction.dokter}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Keputusan Keluarga</label>
              <div className="mt-1 flex items-center">
                {getStatusIcon(selectedAction.keputusanKeluarga)}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAction.keputusanKeluarga)}`}>
                  {selectedAction.keputusanKeluarga}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fasilitas</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAction.fasilitas}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <span className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAction.status)}`}>
                {selectedAction.status}
              </span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAction.tanggal}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setSelectedAction(null)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderAddPatientModal = () => {
    if (!addPatientOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Tambah Pasien Baru</h2>
          {addPatientError && <div className="mb-2 text-red-600 text-sm">{addPatientError}</div>}
          <form
            onSubmit={e => {
              e.preventDefault();
              // Simple validation
              if (!newPatient.nama || !newPatient.jenisKelamin || !newPatient.tanggalLahir) {
                setAddPatientError('Nama, Jenis Kelamin, dan Tanggal Lahir wajib diisi.');
                showNotification('Gagal menambah pasien. Data wajib diisi.', 'error');
                return;
              }
              // Generate new ID
              const newId = `P${(patients.length + 1).toString().padStart(3, '0')}`;
              setPatients([
                ...patients,
                {
                  ...newPatient,
                  id: newId,
                  tanggalDaftar: newPatient.tanggalDaftar || new Date().toISOString().slice(0, 10)
                }
              ]);
              setNewPatient({
                nama: '', jenisKelamin: '', pekerjaan: '', tempatLahir: '', tanggalLahir: '', telpon: '', alamat: '', tanggalDaftar: ''
              });
              setAddPatientError('');
              setAddPatientOpen(false);
              showNotification('Pasien berhasil ditambahkan.', 'success');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama*</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={newPatient.nama} onChange={e => setNewPatient({ ...newPatient, nama: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin*</label>
                <select className="mt-1 w-full border rounded px-2 py-1" value={newPatient.jenisKelamin} onChange={e => setNewPatient({ ...newPatient, jenisKelamin: e.target.value })}>
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pekerjaan</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={newPatient.pekerjaan} onChange={e => setNewPatient({ ...newPatient, pekerjaan: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={newPatient.tempatLahir} onChange={e => setNewPatient({ ...newPatient, tempatLahir: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Lahir*</label>
                <input type="date" className="mt-1 w-full border rounded px-2 py-1" value={newPatient.tanggalLahir} onChange={e => setNewPatient({ ...newPatient, tanggalLahir: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telepon</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={newPatient.telpon} onChange={e => setNewPatient({ ...newPatient, telpon: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={newPatient.alamat} onChange={e => setNewPatient({ ...newPatient, alamat: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Tanggal Daftar</label>
                <input type="date" className="mt-1 w-full border rounded px-2 py-1" value={newPatient.tanggalDaftar} onChange={e => setNewPatient({ ...newPatient, tanggalDaftar: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button type="button" onClick={() => { setAddPatientOpen(false); setAddPatientError(''); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Batal</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderEditPatientModal = () => {
    if (!editPatientOpen || !editPatient) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Edit Data Pasien</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              // Simple validation
              if (!editPatient.nama || !editPatient.jenisKelamin || !editPatient.tanggalLahir) {
                showNotification('Gagal mengedit pasien. Data wajib diisi.', 'error');
                return;
              }
              setPatients(patients.map(p => p.id === editPatient.id ? editPatient : p));
              setEditPatientOpen(false);
              setEditPatient(null);
              showNotification('Data pasien berhasil diperbarui.', 'success');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama*</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={editPatient.nama} onChange={e => setEditPatient({ ...editPatient, nama: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jenis Kelamin*</label>
                <select className="mt-1 w-full border rounded px-2 py-1" value={editPatient.jenisKelamin} onChange={e => setEditPatient({ ...editPatient, jenisKelamin: e.target.value })}>
                  <option value="">Pilih</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pekerjaan</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={editPatient.pekerjaan} onChange={e => setEditPatient({ ...editPatient, pekerjaan: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tempat Lahir</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={editPatient.tempatLahir} onChange={e => setEditPatient({ ...editPatient, tempatLahir: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal Lahir*</label>
                <input type="date" className="mt-1 w-full border rounded px-2 py-1" value={editPatient.tanggalLahir} onChange={e => setEditPatient({ ...editPatient, tanggalLahir: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telepon</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={editPatient.telpon} onChange={e => setEditPatient({ ...editPatient, telpon: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alamat</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={editPatient.alamat} onChange={e => setEditPatient({ ...editPatient, alamat: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Tanggal Daftar</label>
                <input type="date" className="mt-1 w-full border rounded px-2 py-1" value={editPatient.tanggalDaftar} onChange={e => setEditPatient({ ...editPatient, tanggalDaftar: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button type="button" onClick={() => { setEditPatientOpen(false); setEditPatient(null); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Batal</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderDeletePatientModal = () => {
    if (!deletePatientOpen || !deletePatient) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4 text-red-700">Hapus Data Pasien</h2>
          <p className="mb-4">Apakah Anda yakin ingin menghapus pasien <span className="font-semibold">{deletePatient.nama}</span>?</p>
          <div className="flex justify-end space-x-2">
            <button onClick={() => { setDeletePatientOpen(false); setDeletePatient(null); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Batal</button>
            <button
              onClick={() => {
                setPatients(patients.filter(p => p.id !== deletePatient.id));
                setDeletePatientOpen(false);
                setDeletePatient(null);
                showNotification('Data pasien berhasil dihapus.', 'success');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDataTable = (data, columns, onRowClick, onEditClick, onDeleteClick) => (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <div className="min-w-full">
        <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(column => (
                <th key={column.key} className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
              <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map(column => (
                  <td key={column.key} className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onRowClick(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900" onClick={() => onEditClick && onEditClick(item)}>
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => onDeleteClick && onDeleteClick(item)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAddTindakanModal = () => {
    if (!addTindakanOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Tambah Tindakan Medis</h2>
          {addTindakanError && <div className="mb-2 text-red-600 text-sm">{addTindakanError}</div>}
          <form
            onSubmit={e => {
              e.preventDefault();
              // Simple validation
              if (!newTindakan.idPasien || !newTindakan.tindakan || !newTindakan.dokterId) {
                setAddTindakanError('ID Pasien, Tindakan, dan Dokter wajib diisi.');
                showNotification('Gagal menambah tindakan. Data wajib diisi.', 'error');
                return;
              }
              // Generate new ID
              const newId = `T${(tindakan.length + 1).toString().padStart(3, '0')}`;
              // Find patient name
              const pasien = patients.find(p => p.id === newTindakan.idPasien);
              const dokterObj = dokter.find(d => d.id === newTindakan.dokterId);
              setTindakan([
                ...tindakan,
                {
                  ...newTindakan,
                  id: newId,
                  namaPasien: pasien ? pasien.nama : '',
                  dokter: dokterObj ? dokterObj.nama : '',
                  tanggal: newTindakan.tanggal || new Date().toISOString().slice(0, 10),
                  status: 'terjadwal',
                }
              ]);
              setNewTindakan({
                idPasien: '', kriteria: '', tindakan: '', dokter: '', dokterId: '', keputusanKeluarga: '', fasilitas: '', status: 'terjadwal', tanggal: ''
              });
              setAddTindakanError('');
              setAddTindakanOpen(false);
              showNotification('Tindakan berhasil ditambahkan.', 'success');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Pasien*</label>
                <select className="mt-1 w-full border rounded px-2 py-1" value={newTindakan.idPasien} onChange={e => setNewTindakan({ ...newTindakan, idPasien: e.target.value })}>
                  <option value="">Pilih Pasien</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.id} - {p.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kriteria</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={newTindakan.kriteria} onChange={e => setNewTindakan({ ...newTindakan, kriteria: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tindakan*</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={newTindakan.tindakan} onChange={e => setNewTindakan({ ...newTindakan, tindakan: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dokter*</label>
                <select className="mt-1 w-full border rounded px-2 py-1" value={newTindakan.dokterId} onChange={e => setNewTindakan({ ...newTindakan, dokterId: e.target.value })}>
                  <option value="">Pilih Dokter</option>
                  {dokter.map(d => (
                    <option key={d.id} value={d.id}>{d.id} - {d.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Keputusan Keluarga</label>
                <select className="mt-1 w-full border rounded px-2 py-1" value={newTindakan.keputusanKeluarga} onChange={e => setNewTindakan({ ...newTindakan, keputusanKeluarga: e.target.value })}>
                  <option value="">Pilih</option>
                  <option value="setuju">Setuju</option>
                  <option value="tidak setuju">Tidak Setuju</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fasilitas</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={newTindakan.fasilitas} onChange={e => setNewTindakan({ ...newTindakan, fasilitas: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                <input type="date" className="mt-1 w-full border rounded px-2 py-1" value={newTindakan.tanggal} onChange={e => setNewTindakan({ ...newTindakan, tanggal: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button type="button" onClick={() => { setAddTindakanOpen(false); setAddTindakanError(''); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Batal</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Edit tindakan modal state
  const [editTindakanOpen, setEditTindakanOpen] = useState(false);
  const [editTindakan, setEditTindakan] = useState(null);
  // Delete tindakan modal state
  const [deleteTindakanOpen, setDeleteTindakanOpen] = useState(false);
  const [deleteTindakan, setDeleteTindakan] = useState(null);
  // Add doctor modal state
  const [addDoctorOpen, setAddDoctorOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    nama: '',
    spesialisasi: '',
    telpon: ''
  });
  const [addDoctorError, setAddDoctorError] = useState('');
  // Edit doctor modal state
  const [editDoctorOpen, setEditDoctorOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  // Delete doctor modal state
  const [deleteDoctorOpen, setDeleteDoctorOpen] = useState(false);
  const [deleteDoctor, setDeleteDoctor] = useState(null);
  // Add room modal state
  const [addRoomOpen, setAddRoomOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    namaRuang: '',
    status: 'tersedia'
  });
  const [addRoomError, setAddRoomError] = useState('');
  // Edit room modal state
  const [editRoomOpen, setEditRoomOpen] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  // Delete room modal state
  const [deleteRoomOpen, setDeleteRoomOpen] = useState(false);
  const [deleteRoom, setDeleteRoom] = useState(null);

  // Edit Tindakan Modal
  const renderEditTindakanModal = () => {
    if (!editTindakanOpen || !editTindakan) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Edit Tindakan Medis</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!editTindakan.idPasien || !editTindakan.tindakan || !editTindakan.dokterId) {
                showNotification('Gagal mengedit tindakan. Data wajib diisi.', 'error');
                return;
              }
              const pasien = patients.find(p => p.id === editTindakan.idPasien);
              const dokterObj = dokter.find(d => d.id === editTindakan.dokterId);
              setTindakan(tindakan.map(t => t.id === editTindakan.id ? {
                ...editTindakan,
                namaPasien: pasien ? pasien.nama : '',
                dokter: dokterObj ? dokterObj.nama : '',
              } : t));
              setEditTindakanOpen(false);
              setEditTindakan(null);
              showNotification('Tindakan berhasil diperbarui.', 'success');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Pasien*</label>
                <select className="mt-1 w-full border rounded px-2 py-1" value={editTindakan.idPasien} onChange={e => setEditTindakan({ ...editTindakan, idPasien: e.target.value })}>
                  <option value="">Pilih Pasien</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.id} - {p.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kriteria</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={editTindakan.kriteria} onChange={e => setEditTindakan({ ...editTindakan, kriteria: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tindakan*</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={editTindakan.tindakan} onChange={e => setEditTindakan({ ...editTindakan, tindakan: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dokter*</label>
                <select className="mt-1 w-full border rounded px-2 py-1" value={editTindakan.dokterId} onChange={e => setEditTindakan({ ...editTindakan, dokterId: e.target.value })}>
                  <option value="">Pilih Dokter</option>
                  {dokter.map(d => (
                    <option key={d.id} value={d.id}>{d.id} - {d.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Keputusan Keluarga</label>
                <select className="mt-1 w-full border rounded px-2 py-1" value={editTindakan.keputusanKeluarga} onChange={e => setEditTindakan({ ...editTindakan, keputusanKeluarga: e.target.value })}>
                  <option value="">Pilih</option>
                  <option value="setuju">Setuju</option>
                  <option value="tidak setuju">Tidak Setuju</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fasilitas</label>
                <input type="text" className="mt-1 w-full border rounded px-2 py-1" value={editTindakan.fasilitas} onChange={e => setEditTindakan({ ...editTindakan, fasilitas: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                <input type="date" className="mt-1 w-full border rounded px-2 py-1" value={editTindakan.tanggal} onChange={e => setEditTindakan({ ...editTindakan, tanggal: e.target.value })} />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button type="button" onClick={() => { setEditTindakanOpen(false); setEditTindakan(null); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Batal</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Simpan</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Delete Tindakan Modal
  const renderDeleteTindakanModal = () => {
    if (!deleteTindakanOpen || !deleteTindakan) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4 text-red-700">Hapus Tindakan Medis</h2>
          <p className="mb-4">Apakah Anda yakin ingin menghapus tindakan <span className="font-semibold">{deleteTindakan.tindakan}</span> untuk pasien <span className="font-semibold">{deleteTindakan.namaPasien}</span>?</p>
          <div className="flex justify-end space-x-2">
            <button onClick={() => { setDeleteTindakanOpen(false); setDeleteTindakan(null); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Batal</button>
            <button
              onClick={() => {
                setTindakan(tindakan.filter(t => t.id !== deleteTindakan.id));
                setDeleteTindakanOpen(false);
                setDeleteTindakan(null);
                showNotification('Tindakan berhasil dihapus.', 'success');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add Doctor Modal
  const renderAddDoctorModal = () => {
    if (!addDoctorOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Tambah Dokter Baru</h2>
          {addDoctorError && <div className="mb-2 text-red-600 text-sm">{addDoctorError}</div>}
          <form
            onSubmit={e => {
              e.preventDefault();
              // Simple validation
              if (!newDoctor.nama || !newDoctor.spesialisasi || !newDoctor.telpon) {
                setAddDoctorError('Nama, Spesialisasi, dan Telepon wajib diisi.');
                showNotification('Gagal menambah dokter. Data wajib diisi.', 'error');
                return;
              }
              // Generate new ID
              const newId = `D${(dokter.length + 1).toString().padStart(3, '0')}`;
              setDokter([
                ...dokter,
                {
                  ...newDoctor,
                  id: newId
                }
              ]);
              setNewDoctor({
                nama: '', spesialisasi: '', telpon: ''
              });
              setAddDoctorError('');
              setAddDoctorOpen(false);
              showNotification('Dokter berhasil ditambahkan.', 'success');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Dokter*</label>
                <input 
                  type="text" 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={newDoctor.nama} 
                  onChange={e => setNewDoctor({ ...newDoctor, nama: e.target.value })} 
                  placeholder="Contoh: Dr. Ahmad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Spesialisasi*</label>
                <select 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={newDoctor.spesialisasi} 
                  onChange={e => setNewDoctor({ ...newDoctor, spesialisasi: e.target.value })}
                >
                  <option value="">Pilih Spesialisasi</option>
                  <option value="Kardiologi">Kardiologi</option>
                  <option value="Radiologi">Radiologi</option>
                  <option value="Mata">Mata</option>
                  <option value="Bedah Umum">Bedah Umum</option>
                  <option value="Penyakit Dalam">Penyakit Dalam</option>
                  <option value="Anak">Anak</option>
                  <option value="Kebidanan">Kebidanan</option>
                  <option value="Gigi">Gigi</option>
                  <option value="Kulit">Kulit</option>
                  <option value="Saraf">Saraf</option>
                  <option value="Psikiatri">Psikiatri</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Nomor Telepon*</label>
                <input 
                  type="tel" 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={newDoctor.telpon} 
                  onChange={e => setNewDoctor({ ...newDoctor, telpon: e.target.value })} 
                  placeholder="Contoh: 081234567890"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => { setAddDoctorOpen(false); setAddDoctorError(''); }} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Edit Doctor Modal
  const renderEditDoctorModal = () => {
    if (!editDoctorOpen || !editDoctor) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Edit Data Dokter</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              // Simple validation
              if (!editDoctor.nama || !editDoctor.spesialisasi || !editDoctor.telpon) {
                showNotification('Gagal mengedit dokter. Data wajib diisi.', 'error');
                return;
              }
              setDokter(dokter.map(d => d.id === editDoctor.id ? editDoctor : d));
              setEditDoctorOpen(false);
              setEditDoctor(null);
              showNotification('Data dokter berhasil diperbarui.', 'success');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Dokter*</label>
                <input 
                  type="text" 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={editDoctor.nama} 
                  onChange={e => setEditDoctor({ ...editDoctor, nama: e.target.value })} 
                  placeholder="Contoh: Dr. Ahmad"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Spesialisasi*</label>
                <select 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={editDoctor.spesialisasi} 
                  onChange={e => setEditDoctor({ ...editDoctor, spesialisasi: e.target.value })}
                >
                  <option value="">Pilih Spesialisasi</option>
                  <option value="Kardiologi">Kardiologi</option>
                  <option value="Radiologi">Radiologi</option>
                  <option value="Mata">Mata</option>
                  <option value="Bedah Umum">Bedah Umum</option>
                  <option value="Penyakit Dalam">Penyakit Dalam</option>
                  <option value="Anak">Anak</option>
                  <option value="Kebidanan">Kebidanan</option>
                  <option value="Gigi">Gigi</option>
                  <option value="Kulit">Kulit</option>
                  <option value="Saraf">Saraf</option>
                  <option value="Psikiatri">Psikiatri</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Nomor Telepon*</label>
                <input 
                  type="tel" 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={editDoctor.telpon} 
                  onChange={e => setEditDoctor({ ...editDoctor, telpon: e.target.value })} 
                  placeholder="Contoh: 081234567890"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => { setEditDoctorOpen(false); setEditDoctor(null); }} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Delete Doctor Modal
  const renderDeleteDoctorModal = () => {
    if (!deleteDoctorOpen || !deleteDoctor) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4 text-red-700">Hapus Data Dokter</h2>
          <p className="mb-4">Apakah Anda yakin ingin menghapus dokter <span className="font-semibold">{deleteDoctor.nama}</span>?</p>
          <div className="flex justify-end space-x-2">
            <button onClick={() => { setDeleteDoctorOpen(false); setDeleteDoctor(null); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Batal</button>
            <button
              onClick={() => {
                setDokter(dokter.filter(d => d.id !== deleteDoctor.id));
                setDeleteDoctorOpen(false);
                setDeleteDoctor(null);
                showNotification('Data dokter berhasil dihapus.', 'success');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add Room Modal
  const renderAddRoomModal = () => {
    if (!addRoomOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Tambah Ruang Baru</h2>
          {addRoomError && <div className="mb-2 text-red-600 text-sm">{addRoomError}</div>}
          <form
            onSubmit={e => {
              e.preventDefault();
              // Simple validation
              if (!newRoom.namaRuang) {
                setAddRoomError('Nama ruang wajib diisi.');
                showNotification('Gagal menambah ruang. Nama ruang wajib diisi.', 'error');
                return;
              }
              // Generate new ID
              const newId = `R${(ruang.length + 1).toString().padStart(3, '0')}`;
              setRuang([
                ...ruang,
                {
                  ...newRoom,
                  id: newId
                }
              ]);
              setNewRoom({
                namaRuang: '',
                status: 'tersedia'
              });
              setAddRoomError('');
              setAddRoomOpen(false);
              showNotification('Ruang berhasil ditambahkan.', 'success');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Nama Ruang*</label>
                <input 
                  type="text" 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={newRoom.namaRuang} 
                  onChange={e => setNewRoom({ ...newRoom, namaRuang: e.target.value })} 
                  placeholder="Contoh: Ruang Operasi B"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={newRoom.status} 
                  onChange={e => setNewRoom({ ...newRoom, status: e.target.value })}
                >
                  <option value="tersedia">Tersedia</option>
                  <option value="terisi">Terisi</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => { setAddRoomOpen(false); setAddRoomError(''); }} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Tambah
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Edit Room Modal
  const renderEditRoomModal = () => {
    if (!editRoomOpen || !editRoom) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4">Edit Data Ruang</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              // Simple validation
              if (!editRoom.namaRuang) {
                showNotification('Gagal mengedit ruang. Nama ruang wajib diisi.', 'error');
                return;
              }
              setRuang(ruang.map(r => r.id === editRoom.id ? editRoom : r));
              setEditRoomOpen(false);
              setEditRoom(null);
              showNotification('Data ruang berhasil diperbarui.', 'success');
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Nama Ruang*</label>
                <input 
                  type="text" 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={editRoom.namaRuang} 
                  onChange={e => setEditRoom({ ...editRoom, namaRuang: e.target.value })} 
                  placeholder="Contoh: Ruang Operasi B"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  className="mt-1 w-full border rounded px-2 py-1" 
                  value={editRoom.status} 
                  onChange={e => setEditRoom({ ...editRoom, status: e.target.value })}
                >
                  <option value="tersedia">Tersedia</option>
                  <option value="terisi">Terisi</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={() => { setEditRoomOpen(false); setEditRoom(null); }} 
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Delete Room Modal
  const renderDeleteRoomModal = () => {
    if (!deleteRoomOpen || !deleteRoom) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-4 sm:p-6 rounded-lg max-w-xs w-full mx-2 sm:mx-4">
          <h2 className="text-base sm:text-xl font-bold mb-4 text-red-700">Hapus Data Ruang</h2>
          <p className="mb-4">Apakah Anda yakin ingin menghapus ruang <span className="font-semibold">{deleteRoom.namaRuang}</span>?</p>
          <div className="flex justify-end space-x-2">
            <button onClick={() => { setDeleteRoomOpen(false); setDeleteRoom(null); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">Batal</button>
            <button
              onClick={() => {
                setRuang(ruang.filter(r => r.id !== deleteRoom.id));
                setDeleteRoomOpen(false);
                setDeleteRoom(null);
                showNotification('Data ruang berhasil dihapus.', 'success');
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverview();
      
      case 'pasien':
        const patientColumns = [
          { key: 'id', header: 'ID Pasien' },
          { key: 'nama', header: 'Nama' },
          { key: 'jenisKelamin', header: 'Jenis Kelamin' },
          { key: 'telpon', header: 'Telepon' },
          { key: 'pekerjaan', header: 'Pekerjaan' },
          { key: 'tempatLahir', header: 'Tempat Lahir' },
          { key: 'tanggalLahir', header: 'Tanggal Lahir' },
          { key: 'tanggalDaftar', header: 'Tanggal Daftar' },
          { key: 'alamat', header: 'Alamat' }
        ];
        const filteredPatients = patients.filter(p => {
          const search = patientSearch.toLowerCase();
          return p.nama.toLowerCase().includes(search);
        });
        return (
          <div className="space-y-2 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold">Manajemen Data Pasien</h2>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm" onClick={() => setAddPatientOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pasien
              </button>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari berdasarkan nama pasien..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  value={patientSearch}
                  onChange={e => setPatientSearch(e.target.value)}
                />
              </div>
            </div>
            {renderDataTable(filteredPatients, patientColumns, setSelectedPatient, (item) => { setEditPatient(item); setEditPatientOpen(true); }, (item) => { setDeletePatient(item); setDeletePatientOpen(true); })}
          </div>
        );
      
      case 'tindakan':
        const actionColumns = [
          { key: 'id', header: 'ID Tindakan' },
          { key: 'idPasien', header: 'ID Pasien' },
          { key: 'kriteria', header: 'Kriteria' },
          { key: 'tindakan', header: 'Tindakan' },
          { key: 'dokter', header: 'Dokter' },
          { 
            key: 'keputusanKeluarga', 
            header: 'Keputusan Keluarga',
            render: (value) => (
              <div className="flex items-center">
                {getStatusIcon(value)}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                  {value}
                </span>
              </div>
            )
          },
          { key: 'fasilitas', header: 'Fasilitas' }
        ];
        // Filter tindakan based on procedure search
        const filteredTindakan = tindakan.filter(t => t.tindakan.toLowerCase().includes(procedureSearch.toLowerCase()));
        return (
          <div className="space-y-2 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold">Manajemen Tindakan Medis</h2>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm" onClick={() => setAddTindakanOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Tindakan
              </button>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari berdasarkan nama tindakan..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  value={procedureSearch}
                  onChange={e => setProcedureSearch(e.target.value)}
                />
              </div>
            </div>
            {renderDataTable(filteredTindakan, actionColumns, setSelectedAction, (item) => { setEditTindakan({ ...item, dokterId: dokter.find(d => d.nama === item.dokter)?.id || '' }); setEditTindakanOpen(true); }, (item) => { setDeleteTindakan(item); setDeleteTindakanOpen(true); })}
          </div>
        );
      
      case 'rekam':
        const medicalColumns = [
          { key: 'id', header: 'ID Rekam Medis' },
          { key: 'idPasien', header: 'ID Pasien' },
          { key: 'idDokter', header: 'ID Dokter' },
          { key: 'idTindakan', header: 'ID Tindakan' },
          { key: 'idRuang', header: 'ID Ruang' },
          { key: 'diagnosis', header: 'Diagnosis' },
          { key: 'tanggal', header: 'Tanggal' }
        ];
        return (
          <div className="space-y-2 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold">Rekam Medis Digital</h2>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Rekam Medis
              </button>
            </div>
            {renderDataTable(rekamMedis, medicalColumns, () => {})}
          </div>
        );
      
      case 'dokter':
        const doctorColumns = [
          { key: 'id', header: 'ID Dokter' },
          { key: 'nama', header: 'Nama' },
          { key: 'spesialisasi', header: 'Spesialisasi' },
          { key: 'telpon', header: 'Telepon' }
        ];
        return (
          <div className="space-y-2 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold">Manajemen Dokter</h2>
              <button 
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm"
                onClick={() => setAddDoctorOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Dokter
              </button>
            </div>
            {renderDataTable(dokter, doctorColumns, () => {}, (item) => { setEditDoctor(item); setEditDoctorOpen(true); }, (item) => { setDeleteDoctor(item); setDeleteDoctorOpen(true); })}
          </div>
        );
      
      case 'ruang':
        const roomColumns = [
          { key: 'id', header: 'ID Ruang' },
          { key: 'namaRuang', header: 'Nama Ruang' },
          { 
            key: 'status', 
            header: 'Status',
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                {value}
              </span>
            )
          }
        ];
        return (
          <div className="space-y-2 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold">Manajemen Ruang</h2>
              <button 
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm"
                onClick={() => setAddRoomOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Ruang
              </button>
            </div>
            {renderDataTable(ruang, roomColumns, () => {}, (item) => { setEditRoom(item); setEditRoomOpen(true); }, (item) => { setDeleteRoom(item); setDeleteRoomOpen(true); })}
          </div>
        );
      
      default:
        return renderOverview();
    }
  };

  // Notification UI
  const renderNotification = () => {
    if (!notification.message) return null;
    return (
      <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white font-semibold transition-all
        ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      >
        {notification.message}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {renderNotification()}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-6">
            <div className="flex items-center">
              <img src={logo} alt="Hospital Logo" className="w-10 h-10 mr-3 object-cover shadow" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Klinik Pratama Management System</h1>
            </div>
            <div className="flex items-center space-x-2">
              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="hidden sm:flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
              {/* Mobile Nav Button - only visible on mobile */}
              <button
                onClick={() => setMobileNavOpen(true)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <div className="bg-white shadow mb-4 sm:mb-8">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap space-x-2 py-2 sm:py-4 justify-center">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Activity className="w-4 h-4 mr-2" />
              Dashboard Overview
            </button>
            <button 
              onClick={() => setActiveTab('pasien')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'pasien' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Users className="w-4 h-4 mr-2" />
              Data Pasien
            </button>
            <button 
              onClick={() => setActiveTab('tindakan')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'tindakan' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Tindakan Medis
            </button>
            <button 
              onClick={() => setActiveTab('rekam')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'rekam' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Rekam Medis
            </button>
            <button 
              onClick={() => setActiveTab('dokter')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'dokter' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Manajemen Dokter
            </button>
            <button 
              onClick={() => setActiveTab('ruang')}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'ruang' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Building className="w-4 h-4 mr-2" />
              Manajemen Ruang
            </button>
          </nav>
          {/* Mobile Nav Drawer Overlay */}
          {mobileNavOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
              <div className="bg-white w-64 h-full shadow-lg p-4 sm:p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="text-base sm:text-lg font-bold">Navigasi</span>
                  <button
                    onClick={() => setMobileNavOpen(false)}
                    className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
                    aria-label="Close navigation menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <button 
                  onClick={() => { setActiveTab('overview'); setMobileNavOpen(false); }}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Dashboard Overview
                </button>
                <button 
                  onClick={() => { setActiveTab('pasien'); setMobileNavOpen(false); }}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'pasien' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Data Pasien
                </button>
                <button 
                  onClick={() => { setActiveTab('tindakan'); setMobileNavOpen(false); }}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'tindakan' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Tindakan Medis
                </button>
                <button 
                  onClick={() => { setActiveTab('rekam'); setMobileNavOpen(false); }}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'rekam' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Rekam Medis
                </button>
                <button 
                  onClick={() => { setActiveTab('dokter'); setMobileNavOpen(false); }}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'dokter' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Manajemen Dokter
                </button>
                <button 
                  onClick={() => { setActiveTab('ruang'); setMobileNavOpen(false); }}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mb-2 ${activeTab === 'ruang' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Building className="w-4 h-4 mr-2" />
                  Manajemen Ruang
                </button>
                {/* Logout Button in Mobile Menu */}
                <button 
                  onClick={() => { onLogout(); setMobileNavOpen(false); }}
                  className="flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg mt-4"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
              {/* Click outside to close */}
              <div className="flex-1" onClick={() => setMobileNavOpen(false)} />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Remove sidebar, just main content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>

      {renderPatientModal()}
      {renderActionModal()}
      {renderAddPatientModal()}
      {renderEditPatientModal()}
      {renderDeletePatientModal()}
      {renderAddTindakanModal()}
      {renderEditTindakanModal()}
      {renderDeleteTindakanModal()}
      {renderAddDoctorModal()}
      {renderEditDoctorModal()}
      {renderDeleteDoctorModal()}
      {renderAddRoomModal()}
      {renderEditRoomModal()}
      {renderDeleteRoomModal()}
    </div>
  );
};

// LoginScreen component
const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple demo: accept any non-empty username/password
    if (username.trim() && password.trim()) {
      onLogin();
    } else {
      setError('Username dan password wajib diisi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm">
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Hospital Logo" className="w-17 h-17 mb-2  object-cover shadow" />
          <h2 className="text-2xl font-bold mb-2 text-center text-blue-700">Login</h2>
        </div>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  return <HospitalDashboard onLogout={() => setLoggedIn(false)} />;
}

export default App; 