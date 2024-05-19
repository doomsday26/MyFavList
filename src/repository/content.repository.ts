import contentModel, { IContent } from '../models/content'

export default  class ContentRepository{
    private _model = contentModel;

    async getAll():Promise<IContent[]>{
        return await this._model.find();
    }

async createContent(contentDetails:IContent):Promise<IContent>{
return await this._model.create(contentDetails);
}

}
