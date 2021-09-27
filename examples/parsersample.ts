import { Style, StyleParser, UnsupportedProperties } from '../index';
import { ReadStyleResult, WriteStyleResult } from '../style';

export class SampleParser implements StyleParser {

  public static unsupportedProperties: UnsupportedProperties = {
    ScaleDenominator: 'partial',
    Symbolizer: {
      PointSymbolizer: {
        color: 'partial'
      },
      LineSymbolizer: {
        cap: 'none',
        blur: {
          support: 'partial',
          info: 'Blur is only partially supported'
        }
      }
    }
  };

  title = 'Sample Parser';

  writeStyle(geoStylerStyle: Style): Promise<WriteStyleResult> {
    return new Promise<WriteStyleResult>(() => {
      return {
        output: 'sample'
      };
    });
  }

  readStyle(sldString: string): Promise<ReadStyleResult> {
    return new Promise<ReadStyleResult>(() => {
      return {
        output: {
          name: 'Samplestyle',
          rules: []
        }
      };
    });
  }
};

export default SampleParser;
