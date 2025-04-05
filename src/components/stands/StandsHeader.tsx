
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Stand } from '@/types/stand';
import StandForm from './StandForm';

interface StandsHeaderProps {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  selectedStand: Stand | null;
  setSelectedStand: (stand: Stand | null) => void;
  onSuccess: () => void;
}

const StandsHeader: React.FC<StandsHeaderProps> = ({
  isDialogOpen,
  setIsDialogOpen,
  selectedStand,
  setSelectedStand,
  onSuccess
}) => {
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedStand(null);
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedStand(null);
    onSuccess();
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedStand ? 'Editar Stand' : 'Nuevo Stand'}
            </DialogTitle>
          </DialogHeader>
          <StandForm
            stand={selectedStand}
            onSuccess={handleSuccess}
            onCancel={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StandsHeader;
