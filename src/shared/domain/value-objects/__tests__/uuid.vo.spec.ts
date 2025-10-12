import { InvalidUuidError, Uuid } from "../uuid.vo"
import {v4 as uuidv4, validate as uuidValidate} from "uuid"


describe("uuid unit test", ()=> {


    const validateSpy = jest.spyOn(Uuid.prototype as any, 'validate')
    test("Should throw error when uuid is invalid", () => {
        expect(()=> {
            new Uuid("invalid-uuid")
        }).toThrow(new InvalidUuidError)
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })

    test('should create a valid uuid', ()=> {
        const uuid = new Uuid()
        expect(uuid).toBeDefined()
        expect(uuid.id).toBeDefined()
        expect(uuidValidate(uuid.id)).toBe(true)
        expect(validateSpy).toHaveBeenCalledTimes(1);

    })

    test("should accept a valid uuid", () => {
        const uuid = new Uuid()
        expect(uuid).toBe(uuid)
        expect(validateSpy).toHaveBeenCalledTimes(1);

    })
})

//tive que adicionar 
// transformIgnorePatterns: [
//     "node_modules/(?!(uuid)/)", // 👈 force Jest to transpile uuid
//   ],
//para rodar sem problemas