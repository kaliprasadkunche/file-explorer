import React, { useState } from 'react';
import {
  Breadcrumbs,
  Checkbox,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import { Folder, InsertDriveFile, Delete, Home, Archive, Search, Backup } from '@mui/icons-material';
import { styled } from '@mui/system';

const Container = styled(Box)({
  display: 'flex',
  height: '100vh',
});

const Sidebar = styled(Box)({
  width: '220px',
  padding: '20px',
  borderRight: '1px solid #ddd',
  marginTop: '25px',
});

const MainContent = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  overflowY: 'auto',
});

const BreadcrumbsContainer = styled(Breadcrumbs)({
  marginBottom: 10,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  cursor: 'pointer',
});


const TableContainerStyled = styled(TableContainer)({
  flex: 1,
  maxHeight: '300px', // Set the maximum height for scrollable area
  overflowY: 'auto',
  marginBottom: 20,
});

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size: string;
  dateModified: string;
  children?: FileItem[];
}

const initialData: FileItem[] = [
  {
    name: 'Documents',
    type: 'folder',
    size: '-',
    dateModified: '2024-06-01',
    children: [
      { name: 'Document 1.pdf', type: 'file', size: '1 MB', dateModified: '2024-06-01' },
      { name: 'Document 2.docx', type: 'file', size: '2 MB', dateModified: '2024-06-02' },
      {
        name: 'Subfolder 1',
        type: 'folder',
        size: '-',
        dateModified: '2024-06-03',
        children: [
          { name: 'Presentation 1.pptx', type: 'file', size: '1 MB', dateModified: '2024-06-03' },
          { name: 'Spreadsheet 1.xlsx', type: 'file', size: '2 MB', dateModified: '2024-06-04' },
        ],
      },
    ],
  },
  {
    name: 'Certifications',
    type: 'folder',
    size: '-',
    dateModified: '2024-06-02',
    children: [
      { name: 'Certification 1.pdf', type: 'file', size: '1 MB', dateModified: '2024-06-05' },
      {
        name: 'Subfolder 2',
        type: 'folder',
        size: '-',
        dateModified: '2024-06-06',
        children: [
          { name: 'Certification 2.pdf', type: 'file', size: '1 MB', dateModified: '2024-06-06' },
          { name: 'Certification 3.pdf', type: 'file', size: '2 MB', dateModified: '2024-06-07' },
          {
            name: 'Subfolder 2-1',
            type: 'folder',
            size: '-',
            dateModified: '2024-06-08',
            children: [
              { name: 'Certification 4.pdf', type: 'file', size: '1 MB', dateModified: '2024-06-08' },
              { name: 'Certification 5.pdf', type: 'file', size: '2 MB', dateModified: '2024-06-09' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Pictures',
    type: 'folder',
    size: '-',
    dateModified: '2024-06-03',
    children: [
      { name: 'Picture 1.jpeg', type: 'file', size: '1 MB', dateModified: '2024-06-10' },
      { name: 'Picture 2.png', type: 'file', size: '2 MB', dateModified: '2024-06-11' },
    ],
  },
  {
    name: 'App',
    type: 'folder',
    size: '-',
    dateModified: '2024-06-14',
    children: [
      { name: 'App 1.exe', type: 'file', size: '1 MB', dateModified: '2024-06-14' },
      { name: 'App 2.zip', type: 'file', size: '2 MB', dateModified: '2024-06-15' },
    ],
  },
  {
    name: 'File 4',
    type: 'file',
    size: '3 MB',
    dateModified: '2024-06-12',
  },

  {
    name: 'File 5',
    type: 'file',
    size: '4 MB',
    dateModified: '2024-06-13',
  },
 
  {
    name: 'File 7',
    type: 'file',
    size: '6 MB',
    dateModified: '2024-06-20',
  },
  {
    name: 'File 8',
    type: 'file',
    size: '7 MB',
    dateModified: '2024-06-21',
  },
];

const App: React.FC = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(['Home']);
  const [currentItems, setCurrentItems] = useState<FileItem[]>(initialData);
  const [selectedItems, setSelectedItems] = useState<FileItem[]>([]);
  const [openedFolder, setOpenedFolder] = useState<FileItem | null>(null);

  // const navigateToFolder = (folder: FileItem) => {
  //   setBreadcrumbs([...breadcrumbs, folder.name]);
  //   setCurrentItems(folder.children || []);
  // };
  

  const navigateToFolder = (folder: FileItem) => {
    if (openedFolder && openedFolder.name === folder.name) {
      // Close the folder if it's already opened
      setOpenedFolder(null);
    } else {
      // Open the folder
      setOpenedFolder(folder);
      setBreadcrumbs([...breadcrumbs, folder.name]);
      setCurrentItems(folder.children || []);
    }
  };
  

  const goBackTo = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);

    let items = initialData;
    newBreadcrumbs.slice(1).forEach((crumb) => {
      const folder = items.find((item) => item.name === crumb);
      items = folder?.children || [];
    });
    setCurrentItems(items);
  };

  const handleCheckboxChange = (item: FileItem) => {
    const isSelected = selectedItems.find((selected) => selected.name === item.name);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((selected) => selected.name !== item.name));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleDelete = (item: FileItem) => {
    setSelectedItems(selectedItems.filter((selected) => selected.name !== item.name));
  };

  const handleRefresh = () => {
    setSelectedItems([]);
  };


const renderIcon = (item: FileItem) => {
  if (item.type === 'folder') return <img src="./icons8-folder-48.png" alt="folder" style={{ width: '30px', height: '30px'}}  />;
  else if (item.name.endsWith('.txt')) return <img src="./icons8-txt-48.png" alt="txt" style={{ width: '30px', height: '30px'}}  />;
  else if (item.name.endsWith('.pdf')) return <img src="./icons8-pdf-60.png" alt="pdf" style={{ width: '30px', height: '30px'}}  />;
  else if (item.name.endsWith('.png')) return <img src="../icons8-image-48.png" alt="png" style={{ width: '30px', height: '30px'}}  />;
  else if (item.type === 'file') return <img src="../icons8-document-48.png" alt="png" style={{ width: '30px', height: '30px'}}  />;
  else return <InsertDriveFile />;
};


  const renderCheckbox = (item: FileItem) => {
    const isSelected = selectedItems.find((selected) => selected.name === item.name);
    const isPartiallySelected =
      item.type === 'folder' && item.children?.some((child) => selectedItems.find((selected) => selected.name === child.name));
    return (
      <Checkbox
        checked={!!isSelected}
        indeterminate={isPartiallySelected && !isSelected}
        onChange={() => handleCheckboxChange(item)}
      />
    );
  };
  
 
const renderSidebarItems = (items: FileItem[], level: number = 0) => (
  <Box sx={{ marginLeft: `${level * 20}px` }}>
    {items.map((item) => (
      <Box
        key={item.name}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: item.type === 'folder' ? 'pointer' : 'default' }}
          onClick={() => navigateToFolder(item)}
        >
          {renderIcon(item)}
          <Typography sx={{ marginLeft: 1 }}>{item.name}</Typography>
        </Box>
        {item.children && openedFolder === item && renderSidebarItems(item.children, level + 1)}
      </Box>
    ))}
  </Box>
);
  

  return (
    <Container>
      <Sidebar>
        <Typography variant="h5" sx={{marginBottom: '10px'}}>Quick Access</Typography>
        {renderSidebarItems(initialData)}
      </Sidebar>
      <MainContent>
        <Box sx={{marginBottom: '20px', fontSize:'25px'}}>File Manager Explorer</Box>
        <Box sx={{display:'flex',flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid #ddd'}}>
        <BreadcrumbsContainer>
          <Home />
          {breadcrumbs.map((crumb, index) => (
            <Typography key={index} color="inherit" onClick={() => goBackTo(index)}>
              {crumb}
            </Typography>
          ))}
        </BreadcrumbsContainer>
        <IconButton
            color="primary"
            aria-label="refresh"
            onClick={handleRefresh}
        >
            <img src="./icons8-refresh-48.png" alt="refresh" style={{ width: '25px', height: '25px', marginRight: '10px' }} />
            <Typography sx={{color:'#57B0F9'}}>Refresh</Typography>
        </IconButton>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', marginBottom:'5px',borderBottom: '1px solid #ddd', margin: '10px'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', margin: '10px'}}>
            <Archive />
            <Typography>Archive CleanUp</Typography>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', margin: '10px'}}>
            <Search />
            <Typography>Search</Typography>
          </Box>
          <Box sx={{display: 'flex', flexDirection: 'row', margin: '10px'}}>
            <Backup />
            <Typography>Create A Backup Set</Typography>
          </Box>
        </Box>
        <Paper>
          <TableContainerStyled>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>File/Folder Name</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Date Modified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow 
                     key={item.name} 
                     onClick={() => item.type === 'folder' && navigateToFolder(item)}
                     style={{ cursor: item.type === 'folder' ? 'pointer' : 'default' }}
                     >
                    <TableCell style={{ display: 'flex', alignItems: 'center'}}>
                      {renderCheckbox(item)}
                      {renderIcon(item)}
                      {item.name}
                    </TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.dateModified}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainerStyled>
        </Paper>
        <Typography variant="h6">Selected Items</Typography>
        <Paper>
          <TableContainerStyled>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>File/Folder Name</TableCell>
                  <TableCell>Size</TableCell>
                  <TableCell>Date Modified</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedItems.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell style={{ display: 'flex', alignItems: 'center'}}>
                      {renderIcon(item)}
                      {item.name}
                    </TableCell >
                    <TableCell>{item.size}</TableCell>
                    <TableCell>{item.dateModified}</TableCell>
                    <TableCell>
                      <IconButton edge="end" onClick={() => handleDelete(item)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainerStyled>
        </Paper>
      </MainContent>
    </Container>
  );
};

export default App;


