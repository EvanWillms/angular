/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injector} from '../di';
import {BaseException} from '../facade/exceptions';
import {ConcreteType, Type, stringify} from '../facade/lang';
import {AppModuleMetadata} from '../metadata/app_module';

import {AppModuleFactory} from './app_module_factory';
import {ComponentFactory} from './component_factory';


/**
 * Indicates that a component is still being loaded in a synchronous compile.
 *
 * @stable
 */
export class ComponentStillLoadingError extends BaseException {
  constructor(public compType: Type) {
    super(`Can't compile synchronously as ${stringify(compType)} is still being loaded!`);
  }
}

/**
 * Low-level service for running the angular compiler duirng runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@AppModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the app module for compilation
 * of components.
 * @stable
 */
export class Compiler {
  /**
   * Returns the injector with which the compiler has been created.
   */
  get injector(): Injector {
    throw new BaseException(`Runtime compiler is not loaded. Tried to read the injector.`);
  }

  /**
   * Loads the template and styles of a component and returns the associated `ComponentFactory`.
   */
  compileComponentAsync<T>(component: ConcreteType<T>): Promise<ComponentFactory<T>> {
    throw new BaseException(
        `Runtime compiler is not loaded. Tried to compile ${stringify(component)}`);
  }
  /**
   * Compiles the given component. All templates have to be either inline or compiled via
   * `compileComponentAsync` before. Otherwise throws a {@link
   * CompileSyncComponentStillLoadingError}.
   */
  compileComponentSync<T>(component: ConcreteType<T>): ComponentFactory<T> {
    throw new BaseException(
        `Runtime compiler is not loaded. Tried to compile ${stringify(component)}`);
  }
  /**
   * Compiles the given App Module. All templates of the components listed in `precompile`
   * have to be either inline or compiled before via `compileComponentAsync` /
   * `compileAppModuleAsync`. Otherwise throws a {@link CompileSyncComponentStillLoadingError}.
   */
  compileAppModuleSync<T>(moduleType: ConcreteType<T>, metadata: AppModuleMetadata = null):
      AppModuleFactory<T> {
    throw new BaseException(
        `Runtime compiler is not loaded. Tried to compile ${stringify(moduleType)}`);
  }

  compileAppModuleAsync<T>(moduleType: ConcreteType<T>, metadata: AppModuleMetadata = null):
      Promise<AppModuleFactory<T>> {
    throw new BaseException(
        `Runtime compiler is not loaded. Tried to compile ${stringify(moduleType)}`);
  }

  /**
   * Clears all caches
   */
  clearCache(): void {}

  /**
   * Clears the cache for the given component/appModule.
   */
  clearCacheFor(type: Type) {}
}
