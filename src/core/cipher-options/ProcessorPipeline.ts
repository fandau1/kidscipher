import { TextProcessor } from "./Processor";

const processingPipeline = (
  text: string,
  processors: TextProcessor[],
): string => {
  return processors.reduce((acc, processor) => processor(acc), text);
};

export default processingPipeline;
