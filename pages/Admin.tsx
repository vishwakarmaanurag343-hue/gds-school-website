
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { SCHOOL_NAME } from '../constants';
import { Users, FileText, Settings, LogOut, Lock, MessageSquare, GraduationCap, Calendar } from 'lucide-react';

export const Admin = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'admissions' | 'content'>('leads');

  // Data State
  const [leads, setLeads] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();

      if (data.success) {
        setIsAuth(true);
        fetchData();
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('Login failed. Check server connection.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const leadsRes = await fetch('/api/leads');
      const leadsData = await leadsRes.json();
      setLeads(Array.isArray(leadsData) ? leadsData : []);

      const admissionsRes = await fetch('/api/admissions');
      const admsData = await admissionsRes.json();
      setAdmissions(Array.isArray(admsData) ? admsData : []);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Refresh data when tab changes
  useEffect(() => {
    if (isAuth) fetchData();
  }, [activeTab, isAuth]);



  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-100 text-deep rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-deep font-heading">Admin Portal</h2>
            <p className="text-slate-500 text-sm">Secure Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="block w-full rounded border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none transition-all text-sm" placeholder="admin@gds.edu" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} className="block w-full rounded border border-slate-300 px-4 py-2.5 focus:ring-2 focus:ring-royal/20 focus:border-royal outline-none transition-all text-sm" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-deep text-white font-bold py-3 rounded hover:bg-slate-800 transition-all shadow-lg mt-2">
              Login
            </button>
          </form>
          <div className="mt-6 text-xs text-center text-slate-400 pt-4 border-t border-slate-100">

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-deep text-slate-300 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-bold font-heading text-white">{SCHOOL_NAME} Admin</div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors text-sm font-medium ${activeTab === 'leads' ? 'bg-royal text-white' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={18} /> Enquiries / Leads
          </button>
          <button
            onClick={() => setActiveTab('admissions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors text-sm font-medium ${activeTab === 'admissions' ? 'bg-royal text-white' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <GraduationCap size={18} /> Applications
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors text-sm font-medium ${activeTab === 'content' ? 'bg-royal text-white' : 'hover:bg-white/5 hover:text-white'}`}
          >
            <FileText size={18} /> Content
          </button>
        </nav>

        <div className="p-6 border-t border-white/10">
          <button onClick={() => setIsAuth(false)} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors w-full">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-deep font-heading capitalize">
            {activeTab === 'leads' ? 'Contact Enquiries' : activeTab === 'admissions' ? 'Admission Applications' : 'Content Management'}
          </h1>
          <div className="flex gap-3">
            <button onClick={fetchData} className="text-sm text-royal font-bold hover:underline">Refresh Data</button>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-royal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {activeTab === 'leads' && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Parent</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Interest</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {leads.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-500">No enquiries found.</td></tr>
                    ) : (
                      leads.map((lead: any) => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-deep">{lead.parent_name}</div>
                            <div className="text-xs text-slate-400">{lead.source}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-600">{lead.email}</div>
                            <div className="text-sm text-slate-500">{lead.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800">
                              {lead.class_interested || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate" title={lead.message}>
                            {lead.message || '-'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'admissions' && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Ref ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Parent</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {admissions.length === 0 ? (
                      <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-500">No applications yet.</td></tr>
                    ) : (
                      admissions.map((app: any) => (
                        <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-royal font-bold">
                            {app.application_ref}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-deep">{app.student_name}</div>
                            <div className="text-xs text-slate-400">{app.gender}, {new Date(app.dob).toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              {app.grade_applying}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                            {app.parent_name} <br />
                            <span className="text-xs text-slate-400">{app.phone}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-400 uppercase">
                            {app.status || 'Pending'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                  <h3 className="font-bold mb-4 text-deep">Staff Management</h3>
                  <p className="text-sm text-slate-500 mb-4">This section allows you to add, remove, or update staff profiles.</p>
                  <button className="bg-slate-100 text-slate-400 px-4 py-2 rounded text-sm font-medium cursor-not-allowed">Feature Coming Soon</button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};
