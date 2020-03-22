export class Vote {
  public owner: string;
  public vote: string;

  public constructor(owner: string, vote: string) {
    this.owner = owner;
    this.vote = vote;
  }
}
