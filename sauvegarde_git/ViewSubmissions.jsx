<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Typography, Layout, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const ViewSubmissions = () => {
  const [submittedExams, setSubmittedExams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteExamId, setDeleteExamId] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/examens');

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setSubmittedExams(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des examens:', error);
    }
  };

  const handleDeleteExam = async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:5000/api/examens/${deleteExamId}`, { method: 'DELETE' });
        
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        setSubmittedExams(submittedExams.filter(exam => exam.id !== deleteExamId));
        
        setConfirmModalVisible(false);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'examen:', error);
    } finally {
        setLoading(false);
    }
};

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Titre de l\'examen', dataIndex: 'titre', key: 'titre' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Date de création', dataIndex: 'date_creation', key: 'date_creation' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <a 
            href={`http://localhost:5000/uploads/${record.fichier_pdf}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ marginRight: '10px' }}
          >
            <Button 
              type="primary" 
              icon={<EyeOutlined />} 
              style={{ marginRight: 8 }}
            >
              Voir l'épreuve
            </Button>
          </a>
          <Button 
            type="danger" 
            icon={<DeleteOutlined />} 
            onClick={() => { setDeleteExamId(record.id); setConfirmModalVisible(true); }}
          >
            Supprimer
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Content style={{ padding: '0px', background: '#f0f2f5', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card style={{ width: '100%', maxWidth: '1200px' }}>
        <Title level={4} style={{ textAlign: 'center' }}>Voir les Examens Soumis</Title>
        <p>Liste des examens soumis par les étudiants.</p>
        <Table columns={columns} dataSource={submittedExams} pagination={false} rowKey="id" />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ fontSize: '16px', textDecoration: 'none', color: '#1890ff' }}>
            ⇐ Retour à l'accueil
          </Link>
        </div>
      </Card>

      <Modal
        title="Confirmer la suppression"
        visible={confirmModalVisible}
        onOk={handleDeleteExam}
        onCancel={() => setConfirmModalVisible(false)}
        okText="Supprimer"
        cancelText="Annuler"
        confirmLoading={loading}
      >
        <p>Êtes-vous sûr de vouloir supprimer cet examen ? Cette action est irréversible.</p>
      </Modal>
    </Content>
  );
};

=======
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Typography, Layout, Button, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, FileTextOutlined, BookOutlined, CheckSquareOutlined, BarChartOutlined, ReadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const ViewSubmissions = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [submittedExams, setSubmittedExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Remplace cette URL par celle de ton API
    fetch('/api/exams')
      .then((response) => response.json())
      .then((data) => setSubmittedExams(data))
      .catch((error) => console.error('Erreur lors de la récupération des examens:', error));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/connexion");
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Titre de l\'examen', dataIndex: 'title', key: 'title' },
    { title: 'Étudiant', dataIndex: 'student', key: 'student' },
    { title: 'Date de soumission', dataIndex: 'submissionDate', key: 'submissionDate' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Link to={`/exam-corrections/${record.id}`} className="view-corrections-link">
          Voir les corrections
        </Link>
      ),
    },
  ];

  return (
    <Content style={{ padding: '0px', 
      background: '#f0f2f5', 
      minHeight: 'calc(100vh - 64px)', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center' 
      }}>
      <Card style={{ width: '100%', maxWidth: '1200px' }}>
        <Title level={4} style={{ textAlign: 'center' }}>Voir les Examens Soumis</Title>
        <p>Liste des examens soumis par les étudiants.</p>
        <Table columns={columns} dataSource={submittedExams} pagination={false} rowKey="id" />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ fontSize: '16px', textDecoration: 'none', color: '#1890ff' }}>
            ⇐ Retour à l'accueil
          </Link>
        </div>
      </Card>
    </Content>
  );
};

>>>>>>> 2141b2cf41a9fd2732de82fb6074e8310cf11e0a
export default ViewSubmissions;