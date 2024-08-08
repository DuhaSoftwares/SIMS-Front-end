import { BaseViewModel } from '../../internal/base.viewmodel';
import { CoordinatesSM } from '../../service-models/app/v1/client/coordinates-s-m';
import { CropDetailSM } from '../../service-models/app/v1/client/crop-detail-s-m';
import { CropSM } from '../../service-models/app/v1/client/crop-s-m';
import { CropTypeSM } from '../../service-models/app/v1/client/crop-type-s-m';
import { FarmDetailsSM } from '../../service-models/app/v1/client/farm-details-s-m';
import { FarmSM } from '../../service-models/app/v1/client/farm-s-m';
import { ImageModelSM } from '../../service-models/app/v1/client/image-model-s-m';

export class FarmViewModel extends BaseViewModel {
  farmDetails: FarmDetailsSM = new FarmDetailsSM();
  showPreviuosCropDetails: boolean = false;
  addCurrentCropActions:boolean=true;
  addPreviousCropActions:boolean=false;
  hidePreviousCropDetails:boolean=true;
  farmImagePath: string = '';
  cropImagePath: string = '';
  showBtn: boolean = false;
  imageModel: ImageModelSM = new ImageModelSM();
  previousCropImage!:boolean;
  newCropImage!:boolean;
  addOnlyNewCrop!: boolean;
  addPreviousCrop!: boolean;
  showAddFarmDetails: boolean = false;
  showAddCropDetails: boolean = false;
  cropList: CropDetailSM[] = [];
  selectedCropLabelId: number = 0;
  cropTypes: CropTypeSM[] = [];
  coordinates: CoordinatesSM[] = []; // Initialize coordinates as an empty array
  coordinatesObj: CoordinatesSM = new CoordinatesSM();
  FarmSMObj: FarmSM = new FarmSM();
  selectedPolygonArray: [] = [];
  FarmsList: FarmDetailsSM[] = [];
  showTooltip: boolean = false;
  farmerId!: number;
  isDisabled: boolean = true;
  addNewCropdetails: CropSM = new CropSM();
  addPreviousCropdetails:CropSM= new CropSM();
  newCropFormSubmitted: boolean = false;
  showCropList!:boolean;
  cropWizardLabel:boolean=true;
  previousCropFormSubmitted: boolean = false;
  addNewFarmFormSubmitted:boolean=false
  showGrid:boolean=true;
  showMaps:boolean=false;
  showTable:boolean=false;
  farmFormValidations = {
    farmName: [
      { type: 'required', message: 'Farm Name  is Required !' },
      { type: 'minlength', value: 2, message: 'Minimum Length is 2 Characters !' },
      { type: 'maxlength', value: 30, message: 'Maximum Length is 20 Characters !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    country: [
      { type: 'required', message: 'Country is Required !' },
      { type: 'minlength', value: 3, message: 'Minimum Length is 3 Characters !' },
      { type: 'maxlength', value: 30, message: 'Maximum Length is 20 Characters !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    state: [
      { type: 'required', message: 'State is Required !' },
      { type: 'minlength', value: 3, message: 'Minimum Length is 3 Characters !' },
      { type: 'maxlength', value: 30, message: 'Maximum Length is 30 Characters !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    street: [
      { type: 'required', message: 'street is Required !' },
      { type: 'minlength', value: 3, message: 'Minimum Length is 3 Characters !' },
      { type: 'maxlength', value: 30, message: 'Maximum Length is 30 Characters !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    city: [
      { type: 'required', message: 'City is Required !' },
      { type: 'minlength', value: 3, message: 'Minimum Length is 3 Characters !' },
      { type: 'maxlength', value: 30, message: 'Maximum Length is 30 Characters !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    pinCode: [
      { type: 'required', message: 'Pin Code is Required !' },
      { type: 'minlength', value: 4, message: 'Minimum Length is 4 Characters !' },
      { type: 'maxlength', value: 12, message: 'Maximum Length is 12 Characters !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ]
  };

  cropFarmValidations = {
    cropName: [
      { type: 'required', message: 'Crop Name  is Required !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    cropType: [
      { type: 'required', message: 'Crop Type  is Required !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    plantationDate: [
      { type: 'required', message: 'Plantation Date  is Required !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    seasonEndDate: [
      { type: 'required', message: 'SessionEnd Date  is Required !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    firstFlowerBudDate: [
      { type: 'required', message: 'Budd Date  is Required !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ],
    actualYield: [
      { type: 'required', message: 'Actual Yield  is Required !' },
      { type: 'pattern', message: 'Not Valid Format !' }
    ]
  };
}
