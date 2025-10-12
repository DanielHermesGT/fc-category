import { Entity } from "../../shared/domain/entity";
import { EntityValidationError } from "../../shared/domain/validators/validation.error";
import { ValueObject } from "../../shared/domain/value-object";
// import ValidatorRules from "../../shared/domain/validators/validator-rules"; --> referencia de exemplo de uso criado 
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";

export type CategoryConstructorProps = {
    category_id?: CategoryId; //torna mias expressivo do que só id
    name: string
    description?: string | null;
    is_active?: boolean;
    created_at?: Date;

}

export class CategoryId extends Uuid {} //ao meu ver isso é errado, pois alem de extender de uma classe, vamos usar como type um obj concreto

export type CategoryCreateCommand = {
    name: string;
    description?: string | null;
    is_active?: boolean;
}

export class Category extends Entity {
    
    //um modelo rico, tem sua validação
    category_id?: CategoryId; //torna mias expressivo do que só id, e o uuid é um objeto de valor
    name: string
    description?: string | null;
    is_active: boolean;
    created_at: Date;
    
    //a validação, é legal ficar em uma classe separada e não na entidade
    constructor(props: CategoryConstructorProps){
        super()
        this.category_id = props.category_id ?? new CategoryId();
        this.name = props.name;
        this.description = props.description ?? null;
        this.is_active = props.is_active ?? true;
        this.created_at = props.created_at ?? new Date();
    }

     get entity_id(): ValueObject {
        return this.category_id!
    } 

    static create(props: CategoryCreateCommand): Category {//usar o create permite eventos de dominio, validações
        const category = new Category(props)
        Category.validate(category)
        return category
    }

    changeName(name: string): void {
        Category.validate(this)
        this.name = name; //change = permite alterações, validações e eventos, setter só seta, não é rico
    }

    changeDescription(description: string): void{
        Category.validate(this)
        this.description = description
    }

    activate() {
        this.is_active = true;
    }

    deactivate() {
        this.is_active = false;
    }

    static validate(entity: Category){
        const validator = CategoryValidatorFactory.create()
        const isValid = validator.validate(entity)
        if(!isValid) {
            throw new EntityValidationError(validator.errors!);
        }
    }

   
    

    toJSON(){
        return{
            category_id: this.category_id?.id,
            name: this.name,
            description: this.description,
            is_active: this.is_active,
            created_at: this.created_at
        }
    }
}

//algho rico = algo claro

//objetop de valores -> são livres de efeito colateral
//são imutaveis
//servem para informações que provavlemnte nao vao mudar na entidade por exemplo

// class BirthDate{
//     constructor(private readonly value: string) {}
//     getValue(): string {
//         return this.value
//     }
// }

//resumindo cria uma classe de type/class para criar e manipular antes de colocar o atributo