import React, { useState } from 'react';
import Button from '../../components/ui/Button'; 
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

export default function Fournisseurs() {
const [open, setOpen] = useState(false);
  return (
    <div className='px-10'>
      <h1 className=" text-2xl font-bold">Bienvenue sur le Fournisseurs</h1>
       <Button className='bg-blue-500 text-white border border-blue-500' onClick={() => setOpen(true)}>Ouvrir le Modal</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Ajouter un graphique"
      >
        <Input placeholder="Titre du graphique" />
        <Select>
          <option value="fournisseurs">Fournisseurs</option>
          <option value="produits">Produits</option>
        </Select>
        <Button className='bg-blue-500 text-white border border-blue-500' onClick={() => setOpen(false)}>Ajouter</Button>
      </Modal>
    </div>
  );
}
