import React, { useState } from 'react';
import Button from '../../components/ui/Button'; 
import Modal from '../../components/ui/Modal';
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
      <Select
        label="Choisissez un fournisseur"
        options={[
          { label: 'Fournisseur 1', value: 'fournisseur1' },
          { label: 'Fournisseur 2', value: 'fournisseur2' },
          { label: 'Fournisseur 3', value: 'fournisseur3' },
        ]}
        required
        placeholder="Choisir un fournisseur"
      />
      <Button className='bg-blue-500 text-white border border-blue-500' onClick={() => setOpen(false)}>Ajouter</Button>
      </Modal>
    </div>
  );
}
