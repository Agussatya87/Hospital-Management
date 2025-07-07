import React, { useState } from 'react';
import { Users, Calendar, Stethoscope, FileText, UserCheck, Building, Activity, Clock, CheckCircle, XCircle, AlertCircle, Plus, Search, Filter, Edit, Eye, Menu, X } from 'lucide-react';

const HospitalDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Sample data
  const stats = {
    activePasien: 156,
    tindakanHariIni: 42,
    ruangTersedia: 8,
    dokterBertugas: 24
  };

  const patients = [
    { id: 'P001', nama: 'Ahmad Wijaya', jenisKelamin: 'L', pekerjaan: 'Pengusaha', tempatLahir: 'Jakarta', tanggalLahir: '1980-01-01', umur: 45, telpon: '081234567890', alamat: 'Jl. Merdeka No. 10', tanggalDaftar: '2025-01-01' },
    { id: 'P002', nama: 'Siti Nurhaliza', jenisKelamin: 'P', pekerjaan: 'Pedagang', tempatLahir: 'Surabaya', tanggalLahir: '1985-05-15', umur: 32, telpon: '081234567891', alamat: 'Jl. Sudirman No. 25', tanggalDaftar: '2025-02-01' },
    { id: 'P003', nama: 'Budi Santoso', jenisKelamin: 'L', pekerjaan: 'Pengusaha', tempatLahir: 'Bandung', tanggalLahir: '1990-10-20', umur: 28, telpon: '081234567892', alamat: 'Jl. Thamrin No. 15', tanggalDaftar: '2025-03-01' }
  ];

  const tindakan = [
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
      tanggal: '2025-07-08',
      waktu: '09:00'
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
      tanggal: '2025-07-07',
      waktu: '14:30'
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
      tanggal: '2025-07-07',
      waktu: '10:00'
    }
  ];

  const rekamMedis = [
    { id: 'RM001', idPasien: 'P001', idDokter: 'D001', idTindakan: 'T001', idRuang: 'R001', diagnosis: 'Penyakit Jantung Koroner', tanggal: '2025-07-01' },
    { id: 'RM002', idPasien: 'P002', idDokter: 'D002', idTindakan: 'T002', idRuang: 'R002', diagnosis: 'Hipertensi', tanggal: '2025-07-02' },
    { id: 'RM003', idPasien: 'P003', idDokter: 'D003', idTindakan: 'T003', idRuang: 'R003', diagnosis: 'Miopia', tanggal: '2025-07-03' }
  ];

  const dokter = [
    { id: 'D001', nama: 'Dr. Hartono', spesialisasi: 'Kardiologi', telpon: '081234567800', status: 'bertugas' },
    { id: 'D002', nama: 'Dr. Sari', spesialisasi: 'Radiologi', telpon: '081234567801', status: 'bertugas' },
    { id: 'D003', nama: 'Dr. Indra', spesialisasi: 'Mata', telpon: '081234567802', status: 'istirahat' }
  ];

  const ruang = [
    { id: 'R001', namaRuang: 'Ruang Operasi A', status: 'tersedia' },
    { id: 'R002', namaRuang: 'Ruang Radiologi', status: 'terisi' },
    { id: 'R003', namaRuang: 'Ruang Konsultasi 1', status: 'maintenance' }
  ];

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
              <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.jenisKelamin}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Umur</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.umur} tahun</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telepon</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPatient.telpon}</p>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Waktu</label>
              <p className="mt-1 text-sm text-gray-900">{selectedAction.waktu}</p>
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

  const renderDataTable = (data, columns, onRowClick) => (
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
                    <button className="text-green-600 hover:text-green-900">
                      <Edit className="w-4 h-4" />
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

  const renderContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverview();
      
      case 'pasien':
        const patientColumns = [
          { key: 'id', header: 'ID Pasien' },
          { key: 'nama', header: 'Nama' },
          { key: 'jenisKelamin', header: 'Jenis Kelamin' },
          { key: 'umur', header: 'Umur' },
          { key: 'telpon', header: 'Telepon' },
          { key: 'pekerjaan', header: 'Pekerjaan' },
          { key: 'tempatLahir', header: 'Tempat Lahir' },
          { key: 'tanggalLahir', header: 'Tanggal Lahir' },
          { key: 'tanggalDaftar', header: 'Tanggal Daftar' },
          { key: 'alamat', header: 'Alamat' }
        ];
        return (
          <div className="space-y-2 sm:space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <h2 className="text-base sm:text-xl font-bold">Manajemen Data Pasien</h2>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Pasien
              </button>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari pasien..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                />
              </div>
              <button className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center text-xs sm:text-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
            {renderDataTable(patients, patientColumns, setSelectedPatient)}
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
          { key: 'fasilitas', header: 'Fasilitas' },
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
              <h2 className="text-base sm:text-xl font-bold">Manajemen Tindakan Medis</h2>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Tindakan
              </button>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Cari tindakan..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                />
              </div>
              <select className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm">
                <option>Semua Keputusan</option>
                <option>Setuju</option>
                <option>Tidak Setuju</option>
                <option>Pending</option>
              </select>
              <select className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm">
                <option>Semua Fasilitas</option>
                <option>Ruang Operasi A</option>
                <option>Ruang Radiologi</option>
                <option>Ruang Konsultasi 1</option>
              </select>
            </div>
            {renderDataTable(tindakan, actionColumns, setSelectedAction)}
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
          { key: 'telpon', header: 'Telepon' },
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
              <h2 className="text-base sm:text-xl font-bold">Manajemen Dokter</h2>
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Dokter
              </button>
            </div>
            {renderDataTable(dokter, doctorColumns, () => {})}
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
              <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center text-xs sm:text-sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Ruang
              </button>
            </div>
            {renderDataTable(ruang, roomColumns, () => {})}
          </div>
        );
      
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-6">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Hospital Management System</h1>
            {/* Mobile Nav Button - only visible on mobile */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none ml-2"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
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
    </div>
  );
};

function App() {
  return <HospitalDashboard />;
}

export default App; 