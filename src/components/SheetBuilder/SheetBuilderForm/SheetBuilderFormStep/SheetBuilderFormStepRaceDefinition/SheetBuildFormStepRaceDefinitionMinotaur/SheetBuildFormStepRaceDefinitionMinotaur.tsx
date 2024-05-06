import { submitRace } from '@/store/slices/sheetBuilder/sheetBuilderSliceRaceDefinition';
import React from 'react';
import { Minotaur, Race, SerializedRace } from 't20-sheet-builder';
import ConfirmButton from '../../../ConfirmButton';
import AttributesPreviewStatic from '../AtrributesPreviewStatic';
import { RaceComponentProps } from '../SheetBuilderFormStepRaceDefinition';

const SheetBuildFormStepRaceDefinitionMinotaur: React.FC<
  RaceComponentProps
> = ({ confirmRace, attributesPreview }) => {
  const makeMinotaur = () => new Minotaur();
  const createSubmitAction = (race: Race) => {
    const minotaur = race as Minotaur;
    return submitRace(minotaur.serialize() as SerializedRace);
  };

  const confirmMinotaur = () => {
    confirmRace(makeMinotaur, createSubmitAction, 'isRaceReady');
  };

  return (
    <div>
      <p className='mb-6'>
        Povo guerreiro, orgulhoso e poderoso, criadores de uma civilização
        avançada, com a missão sagrada de proteger e governar os fracos.
      </p>
      <AttributesPreviewStatic attributesPreview={attributesPreview} />
      <ConfirmButton confirm={confirmMinotaur} />
    </div>
  );
};

export default SheetBuildFormStepRaceDefinitionMinotaur;
