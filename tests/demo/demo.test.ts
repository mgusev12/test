import { suite, test } from '@testdeck/mocha';
import { assert } from 'chai';
import * as fs from 'fs';
import { demoHook } from './hook'; //path to your hook.ts file (src/strapi-data/hooks/ts)

@suite class DemoUnitTests { //name of the test suite

    private SUT: any;
    private expected: any;

    before() { //parsing input and output object from files
        this.SUT = JSON.parse(fs.readFileSync("./demo/in.json", "utf8"));
        this.expected = JSON.parse(fs.readFileSync("./demo/out.json", "utf8"));
    }

    @test 'updatable field should change'() { //test case
        // testing our hook
        assert.deepEqual(demoHook(this.SUT), this.expected, "field change from input to output")
    }

    //here can be any amount of other tests
    // @test 'another test'() { 
    //     assert(one === other, "one should be equal other")
    // }

}