
export type FnTransformer = (str: string) => Promise<string>
export type FnTransformerFactory<O> = (options: O) => FnTransformer

export type TokenHeading = {
  type: 'heading';
  raw: string;
  depth: number;
  text: string; 
}